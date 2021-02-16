import * as actions from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actions.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actions.AUTH_LOGOUT
  };
};

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

      dispatch(authSuccess(token, userId));
    })
    .catch( err => {
      const errMessage = err.response.data.error.message;

      dispatch(authFail(errMessage));
    })
  }
};

