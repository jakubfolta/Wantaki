import * as actions from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actions.AUTH_START
  };
}

export const authSuccess = (token, userId, user) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    userId: userId,
    user: user
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
  // console.log(userId);

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
  console.log(uuid);
  return uuid;
}

export const auth = (email, password, type, path) => {
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
      const emailUserId = email.split('@')[0] + userId;
      console.log(userId);

      let user = {};

      // Set and save uuid (used for creating url to user's list of items) when signing up
      if (type) {
        user = {
          uuid: setUuid(userId),
          partEmail: email.split('@')[0]
        }
        // console.log('https://what-i-desire-default-rtdb.firebaseio.com/users/' + email.split('@')[0] + user.uuid + '/uuid.json?auth=');
        // axios.post('https://what-i-desire-default-rtdb.firebaseio.com/users/uuid.json?auth=' + token, user)
        axios.post('https://what-i-desire-default-rtdb.firebaseio.com/users/' + emailUserId + '/uuid.json?auth=' + token, user)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            const errMessage = error.response.data.error;
            console.log(errMessage);
          })

        dispatch(authSuccess(token, userId, user));
        localStorage.setItem('user', JSON.stringify(user));

      // Fetching uuid when signing in
      } else {
        axios.get('https://what-i-desire-default-rtdb.firebaseio.com/users/' + emailUserId + '/uuid.json?auth=' + token)
          .then(response => {
            console.log(response);
            for (let el in response.data) {
              user = {
                ...response.data.[el]
              }
            }

            dispatch(authSuccess(token, userId, user));
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
          })
          .catch(error => {
            const errMessage = error.response.data.error;
            console.log(errMessage);
          })
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expireDate', expireDate);

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
        const expireTime = (expireDate.getTime() - new Date().getTime()) / 1000;

        dispatch(authSuccess(token, userId, JSON.parse(user)));
        dispatch(checkAuthExpire(expireTime));
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