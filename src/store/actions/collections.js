import axios from 'axios';
import * as actions from './actionTypes';
import { addCollection, deleteUserCollection, updateUserCollectionAndItems } from '../../network/lib/collections';
import { setRequestData, sortItems } from '../../shared/utility';

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

export const deleteCollection = data => {
  return dispatch => {
    dispatch(deleteCollectionStart());

    const {queryParams} = setRequestData(data.id, data.token);

    deleteUserCollection(data.partEmail, data.userId, queryParams)
      .then(response => {
        const updatedCollections = data.collections.filter(el => el.id !== data.id);
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

    const {queryParams, databaseUpdatedItems} = setRequestData(collectionId, token, updatedItems);

    updateUserCollectionAndItems(partEmail, userId, token, queryParams, collectionWithItems, databaseUpdatedItems)
      .then(axios.spread((...responses) => {
        const collectionsCopy = [...collections];
        const updatedCollectionIndex = collections.findIndex(el => el.id === collectionId);
        collectionsCopy[updatedCollectionIndex] = collectionWithItems;

        setTimeout(() => {
          dispatch(addItemsToCollectionSuccess(collectionsCopy, updatedItems));

        },4000)
      }))
      .catch(error => {
        const errorMessage = error.responses.data.error;
        dispatch(addItemsToCollectionFail(errorMessage));
      })
  };
}

export const removeItemFromCollectionStart = () => {
  return {
    type: actions.REMOVE_ITEM_FROM_COLLECTION_START
  };
}

export const removeItemFromCollectionSuccess = (items, collections) => {
  return {
    type: actions.REMOVE_ITEM_FROM_COLLECTION_SUCCESS,
    items: items,
    collections: collections
  };
}

export const removeItemFromCollectionFail = error => {
  return {
    type: actions.REMOVE_ITEM_FROM_COLLECTION_FAIL,
    error: error
  };
}

export const removeItemFromCollection = data => {
  return dispatch => {
    dispatch(removeItemFromCollectionStart());

    const {queryParams, databaseUpdatedItems} = setRequestData(data.collectionId, data.token, data.updatedItems);

    updateUserCollectionAndItems(data.partEmail, data.userId, data.token, queryParams, data.updatedCollection, databaseUpdatedItems)
      .then(axios.spread((...responses) => {
        const itemsTimestamps = [];

        for (let item of data.updatedItems) {
          itemsTimestamps.push(item.timestamp)
        }

        const updatedSortedItems = sortItems(itemsTimestamps, data.updatedItems);

        dispatch(removeItemFromCollectionSuccess(updatedSortedItems, data.updatedCollections))
      }))
      .catch(error => {
        const errorMessage = error.responses.data.error;
        dispatch(removeItemFromCollectionFail(errorMessage));
      })
  };
}

