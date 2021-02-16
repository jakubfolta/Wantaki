import * as actions from './actionTypes';

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

};

