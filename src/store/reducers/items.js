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
  return updateObject(state, { error: null });
};

const initEditMode = (state, action) => {
  return updateObject(state, { items: action.items });
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
  });
};

// Deleting item from firebase
const deleteItemStart = (state, action) => {
  return updateObject(state, {
    loadingItems: true,
    fetchingError: null
  });
};

const deleteItemSuccess = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    items: action.items
  });
};

const deleteItemFail = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    fetchingError: action.error
  });
};

// Editing items
const editItemStart = (state, action) => {
  return updateObject(state, { items: action.items });
};

const updateItemStart = (state, action) => {
  return updateObject(state, {
    loadingItems: true,
    fetchingError: null
  });
};

const updateItemSuccess = (state, action) => {
  return updateObject(state, {
    items: action.items,
    loadingItems: false
  });
};

const updateItemFail = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    fetchingError: action.error
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_ITEM_START: return newItemStart(state, action);
    case actions.NEW_ITEM_SUCCESS: return newItemSuccess(state, action);
    case actions.NEW_ITEM_FAIL: return newItemFail(state, action);
    case actions.INIT_ERROR: return initError(state, action);

    case actions.FETCH_ITEMS_START: return fetchItemsStart(state, action);
    case actions.FETCH_ITEMS_SUCCESS: return fetchItemsSuccess(state, action);
    case actions.FETCH_ITEMS_FAIL: return fetchItemsFail(state, action);

    case actions.DELETE_ITEM_START: return deleteItemStart(state, action);
    case actions.DELETE_ITEM_SUCCESS: return deleteItemSuccess(state, action);
    case actions.DELETE_ITEM_FAIL: return deleteItemFail(state, action);

    case actions.EDIT_ITEM_START: return editItemStart(state,action);
    case actions.INIT_EDIT_MODE: return initEditMode(state, action);

    case actions.UPDATE_ITEM_START: return updateItemStart(state, action);
    case actions.UPDATE_ITEM_SUCCESS: return updateItemSuccess(state, action);
    case actions.UPDATE_ITEM_FAIL: return updateItemFail(state,action);
    default: return state;
  };
};

export default reducer;