import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  items: [],
  error: false,
  loading: false
};

const newItemStart = (state, action) => {
  return updateObject(state, {
    error: false,
    loading: true
  });
};

const newItemSuccess = (state, action) => {
  return updateObject(state, {
    items: state.items.concat(action.item),
    loading: false
  });
};

const newItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_ITEM_START: return newItemStart(state, action);
    case actions.NEW_ITEM_SUCCESS: return newItemSuccess(state, action);
    case actions.NEW_ITEM_FAIL: return newItemFail(state, action);
    default: return state;
  };
};

export default reducer;