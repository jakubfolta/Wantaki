import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  items: [],
  collections: [],
  error: null,
  fetchingError: null,
  loading: false,
  loadingCollections: false,
  isLoadingDeleteCollection: false,
  collectionError: null,
  loadingItems: false,
  loadingAddItemsToCollection: false,
  loadingRemoveItemsFromCollection: false,
  removeItemError: null
};

// Add new item to firebase
const newItemStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const newItemSuccess = (state, action) => {
  return updateObject(state, { loading: false });
}

const newItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const initError = (state, action) => {
  return updateObject(state, { error: null });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    items: [],
    collections: []
  });
}

const initEditMode = (state, action) => {
  return updateObject(state, { items: action.items });
}

// Fetching items from firebase
const fetchDataStart = (state, action) => {
  return updateObject(state, {
    loadingItems: true,
    fetchingError: null
  });
}

const fetchDataSuccess = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    items: action.items,
    collections: action.collections
  });
}

const fetchDataFail = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    fetchingError: action.error
  });
}

// Deleting item from firebase
const deleteItemStart = (state, action) => {
  return updateObject(state, {
    loadingItems: true,
    fetchingError: null
  });
}

const deleteItemSuccess = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    items: action.items
  });
}

const deleteItemFail = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    fetchingError: action.error
  });
}

// Editing items
const setItemEditMode = (state, action) => {
  return updateObject(state, { items: action.items });
}

const updateItemStart = (state, action) => {
  return updateObject(state, {
    loadingItems: true,
    fetchingError: null
  });
}

const updateItemSuccess = (state, action) => {
  return updateObject(state, {
    items: action.items,
    loadingItems: false
  });
}

const updateItemFail = (state, action) => {
  return updateObject(state, {
    loadingItems: false,
    fetchingError: action.error
  });
}

const setUserDataFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}

const newCollectionStart = (state, action) => {
  return updateObject(state, {
    loadingCollections: true,
    collectionError: null
  });
}

const newCollectionSuccess = (state, action) => {
  return updateObject(state, {
    loadingCollections: false,
    collections: action.collections
  });
}

const newCollectionFail = (state, action) => {
  return updateObject(state, {
    loadingCollections: false,
    collectionError: action.error
  });
}

const deleteCollectionStart = (state, action) => {
  return updateObject(state, {
    isLoadingDeleteCollection: true,
    collectionError: null
  });
}

const deleteCollectionSuccess = (state, action) => {
  return updateObject(state, {
    isLoadingDeleteCollection: false,
    collections: action.collections
  });
}

const deleteCollectionFail = (state, action) => {
  return updateObject(state, {
    isLoadingDeleteCollection: false,
    collectionError: action.error
  });
}

const addItemsToCollectionStart = (state, action) => {
  return updateObject(state, {
    collectionError: null,
    loadingAddItemsToCollection: true
  });
}

const addItemsToCollectionSuccess = (state, action) => {
  return updateObject(state, {
    collections: action.collections,
    items: action.items,
    loadingAddItemsToCollection: false
  });
}

const addItemsToCollectionFail = (state, action) => {
  return updateObject(state, {
    collectionError: action.error,
    loadingAddItemsToCollection: false
  });
}

const removeItemFromCollectionStart = (state, action) => {
  return updateObject(state, {
    loadingRemoveItemsFromCollection: true,
    removeItemError: null
  });
}

const removeItemFromCollectionSuccess = (state, action) => {
  return updateObject(state, {
    items: action.items,
    collections: action.collections,
    loadingRemoveItemsFromCollection: false
  });
}

const removeItemFromCollectionFail = (state, action) => {
  return updateObject(state, {
    loadingRemoveItemsFromCollection: false,
    removeItemError: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_ITEM_START: return newItemStart(state, action);
    case actions.NEW_ITEM_SUCCESS: return newItemSuccess(state, action);
    case actions.NEW_ITEM_FAIL: return newItemFail(state, action);
    case actions.INIT_ERROR: return initError(state, action);

    case actions.AUTH_LOGOUT: return authLogout(state, action);

    case actions.FETCH_DATA_START: return fetchDataStart(state, action);
    case actions.FETCH_DATA_SUCCESS: return fetchDataSuccess(state, action);
    case actions.FETCH_DATA_FAIL: return fetchDataFail(state, action);

    case actions.DELETE_ITEM_START: return deleteItemStart(state, action);
    case actions.DELETE_ITEM_SUCCESS: return deleteItemSuccess(state, action);
    case actions.DELETE_ITEM_FAIL: return deleteItemFail(state, action);

    case actions.SET_ITEM_EDIT_MODE: return setItemEditMode(state,action);
    case actions.INIT_EDIT_MODE: return initEditMode(state, action);

    case actions.UPDATE_ITEM_START: return updateItemStart(state, action);
    case actions.UPDATE_ITEM_SUCCESS: return updateItemSuccess(state, action);
    case actions.UPDATE_ITEM_FAIL: return updateItemFail(state,action);

    case actions.SET_USER_DATA_FAIL: return setUserDataFail(state, action);

    case actions.NEW_COLLECTION_START: return newCollectionStart(state, action);
    case actions.NEW_COLLECTION_SUCCESS: return newCollectionSuccess(state, action);
    case actions.NEW_COLLECTION_FAIL: return newCollectionFail(state, action);

    case actions.DELETE_COLLECTION_START: return deleteCollectionStart(state, action);
    case actions.DELETE_COLLECTION_SUCCESS: return deleteCollectionSuccess(state, action);
    case actions.DELETE_COLLECTION_FAIL: return deleteCollectionFail(state, action);

    case actions.ADD_ITEMS_TO_COLLECTION_START: return addItemsToCollectionStart(state, action);
    case actions.ADD_ITEMS_TO_COLLECTION_SUCCESS: return addItemsToCollectionSuccess(state, action);
    case actions.ADD_ITEMS_TO_COLLECTION_FAIL: return addItemsToCollectionFail(state, action);

    case actions.REMOVE_ITEM_FROM_COLLECTION_START: return removeItemFromCollectionStart(state, action);
    case actions.REMOVE_ITEM_FROM_COLLECTION_SUCCESS: return removeItemFromCollectionSuccess(state, action);
    case actions.REMOVE_ITEM_FROM_COLLECTION_FAIL: return removeItemFromCollectionFail(state, action);

    default: return state;
  }
}

export default reducer;