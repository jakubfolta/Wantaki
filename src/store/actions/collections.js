import * as actions from './actionTypes';
import { addCollection, deleteUserCollection, updateUserCollection } from '../../network/lib/collections';

// Add new collection to redux and firebase
export const newCollectionStart = () => {
  return {
    type: actions.NEW_COLLECTION_START
  };
}

export const newCollectionSuccess = collections => {
  return {
    type: actions.NEW_COLLECTION_SUCCESS,
    collections: collections
  };
}

export const newCollectionFail = error => {
  return {
    type: actions.NEW_COLLECTION_FAIL,
    error: error
  };
}

export const newCollection = (token, partEmail, userId, collections, newCollection) => {
  return dispatch => {
    dispatch(newCollectionStart());

    addCollection(partEmail, userId, token, newCollection)
      .then(response => {
        const updatedCollection = {
          ...newCollection,
          id: response.data.name
        };
        const newCollections = [...collections];
        newCollections.unshift(updatedCollection);

        dispatch(newCollectionSuccess(newCollections));
      })
      .catch(error => {
        const errorMessage = error.response.data.error;
        dispatch(newCollectionFail(errorMessage));
      })
  };
}

// Delete collection from redux and firebase
export const deleteCollectionStart = () => {
  return {
    type: actions.DELETE_COLLECTION_START
  };
}

export const deleteCollectionSuccess = collections => {
  return {
    type: actions.DELETE_COLLECTION_SUCCESS,
    collections: collections
  };
}

export const deleteCollectionFail = error => {
  return {
    type: actions.DELETE_COLLECTION_FAIL,
    error: error
  };
}

export const deleteCollection = (partEmail, userId, token, id, collections) => {
  return dispatch => {
    dispatch(deleteCollectionStart());

    const queryParams = id +'.json?auth=' + token;

    deleteUserCollection(partEmail, userId, queryParams)
      .then(response => {
        const updatedCollections = collections.filter(el => el.id !== id);
        console.log(updatedCollections);
        dispatch(deleteCollectionSuccess(updatedCollections));

      })
      .catch(error => {
        const errorMessage = error.response.data.error;
        dispatch(deleteCollectionFail(errorMessage));
      })
  };
}

export const addItemsToCollectionStart = () => {
  return {
    type: actions.ADD_ITEMS_TO_COLLECTION_START
  };
}

export const addItemsToCollectionSuccess = collections => {
  return {
    type: actions.ADD_ITEMS_TO_COLLECTION_SUCCESS,
    collections: collections
  };
}

export const addItemsToCollectionFail = error => {
  return {
    type: actions.ADD_ITEMS_TO_COLLECTION_FAIL,
    error: error
  };
}

export const addItemsToCollection = (partEmail, userId, token, collectionId, collectionWithItems, collections) => {
  return dispatch => {
    dispatch(addItemsToCollectionStart());

    const queryParams = collectionId + '.json?auth=' + token;

    updateUserCollection(partEmail, userId, queryParams, collectionWithItems)
      .then(response => {
        const collectionsCopy = [...collections];
        const updatedCollectionIndex = collections.findIndex(el => el.id === collectionId);
        // let updatedCollection = collectionsCopy[updatedCollectionIndex];
        collectionsCopy[updatedCollectionIndex] = collectionWithItems;

        // updatedCollection = collectionWithItems;
        dispatch(addItemsToCollectionSuccess(collectionsCopy));
      })
      .catch(error => {
        const errorMessage = error.response.data.error;
        dispatch(addItemsToCollectionFail(errorMessage));
      })
  }
}



















