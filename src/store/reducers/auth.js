import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  delay: 4000,
  loading: false,
  token: null,
  userId: null,
  partEmail: null,
  error: null,
  user: ''
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.token,
    userId: action.userId,
    partEmail: action.partEmail
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    partEmail: null,
    user: ''
  });
}

const initError = (state, action) => {
  return updateObject(state, {error: null});
}

const setUserDataSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START: return authStart(state, action);
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_FAIL: return authFail(state, action);
    case actions.AUTH_LOGOUT: return authLogout(state, action);
    case actions.AUTH_INIT_ERROR: return initError(state, action);

    case actions.SET_USER_DATA_SUCCESS: return setUserDataSuccess(state, action);
    default: return state;
  }
}

export default reducer;