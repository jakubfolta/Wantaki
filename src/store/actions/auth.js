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

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expireDate', expireDate);

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
        const expireTime = (expireDate.getTime() - new Date().getTime()) / 1000;

        dispatch(authSuccess(token, userId));
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