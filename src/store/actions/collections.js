import axios from 'axios';
import * as actions from './actionTypes';
import { addCollection, deleteUserCollection, updateUserCollectionAndItems } from '../../network/lib/collections';

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
          id: response.data.name,
          items: []
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

export const addItemsToCollectionSuccess = (collections, items) => {
  return {
    type: actions.ADD_ITEMS_TO_COLLECTION_SUCCESS,
    collections: collections,
    items: items
  };
}

export const addItemsToCollectionFail = error => {
  return {
    type: actions.ADD_ITEMS_TO_COLLECTION_FAIL,
    error: error
  };
}

export const addItemsToCollection = (partEmail, userId, token, collectionId, collectionWithItems, updatedItems, collections) => {
  return dispatch => {
    dispatch(addItemsToCollectionStart());

    const queryParams = collectionId + '.json?auth=' + token;
    const databaseUpdatedItems = {};

    for (const item of updatedItems) {
      databaseUpdatedItems[item.id] = {...item}
    }

    updateUserCollectionAndItems(partEmail, userId, token, queryParams, collectionWithItems, databaseUpdatedItems)
      .then(axios.spread((...responses) => {
        const collectionsCopy = [...collections];
        const updatedCollectionIndex = collections.findIndex(el => el.id === collectionId);
        collectionsCopy[updatedCollectionIndex] = collectionWithItems;

        dispatch(addItemsToCollectionSuccess(collectionsCopy, updatedItems));
      }))
      .catch(error => {
        const errorMessage = error.responses.data.error;
        dispatch(addItemsToCollectionFail(errorMessage));
      })
  }
}



















