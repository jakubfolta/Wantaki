import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  items: [],
  error: null,
  fetchingError: null,
  loading: false,
  loadingItems: false
};

// Add new item to firebase
const newItemStart = (state, action) => {
  return updateObject(state, {
    error: false,
    loading: true
  });
};

const newItemSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const newItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const initError = (state, action) => {
  return updateObject(state, {error: null});
};

// Fetching items from firebase
const fetchItemsStart = (state, action) => {
  return updateObject(state, {
    loadingItems: true,
    fetchingError: null
  });
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    items: action.items
  });
};

const fetchItemsFail = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    fetchingError: action.error
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_ITEM_START: return newItemStart(state, action);
    case actions.NEW_ITEM_SUCCESS: return newItemSuccess(state, action);
    case actions.NEW_ITEM_FAIL: return newItemFail(state, action);
    case actions.ITEMS_INIT_ERROR: return initError(state, action);

    case actions.FETCH_ITEMS_START: return fetchItemsStart(state, action);
    case actions.FETCH_ITEMS_SUCCESS: return fetchItemsSuccess(state, action);
    case actions.FETCH_ITEMS_FAIL: return fetchItemsFail(state, action);
    default: return state;
  };
};

export default reducer;