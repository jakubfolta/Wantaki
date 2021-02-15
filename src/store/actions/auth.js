import * as actions from './actionTypes';

export const authStart = () => {
  return {
    type: actions.AUTH_START
  }
}

export const authSuccess = (token, userId, expireTime) => {
  
}

export const authFail = error => {

}

export const logout = () => {

}

export const auth = (email, password, type) => {

}

