import * as actions from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actions.AUTH_START
  };
}

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
}

export const authFail = error => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  };
}

export const checkAuthExpire = expireTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expireTime * 1000)
  };
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expireDate');
  localStorage.removeItem('user');
  return {
    type: actions.AUTH_LOGOUT
  };
}

export const initError = () => {
  return {
    type: actions.AUTH_INIT_ERROR
  };
}

export const checkAuthErrorState = error => {
  return dispatch => {
    if (error) {
      dispatch(initError())
    }
    else {
      return
    }
  };
}

export const setUuid = userId => {
  let uuid = '';

  for (let char of userId) {
    if (/^-?[\d.]+(?:e-?\d+)?$/.test(char)) {
      uuid += (char + Math.floor((Math.random() * (Math.random() * 100)) + 1));
    } else if (/[a-zA-Z]/.test(char)) {
      const result = Math.floor((Math.random() * 10) + 1) < 5 ? true : false;
      if (result) {
        uuid += char.toLowerCase() === char ? char.toUpperCase() : char.toLowerCase();
      } else {
        uuid += char;
      }
    } else {
      uuid += char;
    }
  }
  return uuid;
}

export const setUserDataSuccess = user => {
  return {
    type: actions.SET_USER_DATA_SUCCESS,
    user: user
  };
}

export const setUserDataFail = error => {
  return {
    type: actions.SET_USER_DATA_FAIL,
    error: error
  };
}

export const setUserData = (type, token, userId, email) => {
  return dispatch => {
    const emailUserId = email.split('@')[0] + userId;
    let user = {};

    // Set and save uuid (used for creating url to user's list of items) when signing up
    if (type) {
      user = {
        uuid: setUuid(userId),
        partEmail: email.split('@')[0]
      }

      axios.post('https://what-i-desire-default-rtdb.firebaseio.com/users/' + emailUserId + '/uuid.json?auth=' + token, user)
        .then(response => {
          localStorage.setItem('user', JSON.stringify(user));

          dispatch(setUserDataSuccess(user));
        })
        .catch(error => {
          const errMessage = error.response.data.error;

          dispatch(setUserDataFail(errMessage));
        })

    // Fetching uuid when signing in
    } else {
      axios.get('https://what-i-desire-default-rtdb.firebaseio.com/users/' + emailUserId + '/uuid.json?auth=' + token)
        .then(response => {
          for (let el in response.data) {
            user = {
              ...response.data.[el]
            }
          }

          localStorage.setItem('user', JSON.stringify(user));

          dispatch(setUserDataSuccess(user));
        })
        .catch(error => {
          const errMessage = error.response.data.error;

          dispatch(setUserDataFail(errMessage));
        })
    }
  };
}

export const auth = (email, password, type) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = type
    ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDi3D7k7mvZB32yiGh9J7HWGWVdmw5n2vw'
    : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDi3D7k7mvZB32yiGh9J7HWGWVdmw5n2vw';

    axios.post(url, authData)
    .then( response => {
      const token = response.data.idToken;
      const userId = response.data.localId;
      const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);


      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expireDate', expireDate);

      dispatch(setUserData(type, token, userId, email));
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthExpire(response.data.expiresIn));
    })
    .catch( err => {
      const errMessage = err.response.data.error.message;

      dispatch(authFail(errMessage));
    })
  };
}

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const expireDate = new Date(localStorage.getItem('expireDate'));
      if (expireDate > new Date()) {
        const userId = localStorage.getItem('userId');
        const user = localStorage.getItem('user');
        const theme = localStorage.getItem('data-theme');
        const expireTime = (expireDate.getTime() - new Date().getTime()) / 1000;

        document.documentElement.setAttribute('data-theme', theme);
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthExpire(expireTime));
        dispatch(setUserDataSuccess(JSON.parse(user)));
      }
      else {
        dispatch(logout());
      }
    }
    else {
      return
    }
  };
}