import * as actions from './actionTypes';
import { addItem, fetchUserData, deleteUserItem, updateUserItem, addCollection } from '../../network/lib/items';

import { sortItems } from '../../shared/utility';

// Add new item to firebase
export const newItemStart = () => {
  return {
    type: actions.NEW_ITEM_START
  };
}

export const newItemSuccess = () => {
  return {
    type: actions.NEW_ITEM_SUCCESS
  };
}

export const newItemFail = error => {
  return {
    type: actions.NEW_ITEM_FAIL,
    error: error
  };
}

export const initError = () => {
  return {
    type: actions.INIT_ERROR
  };
}

export const initEditMode = items => {
  return {
    type: actions.INIT_EDIT_MODE,
    items: items
  };
}

export const setInitialState = (error, items) => {
  return dispatch => {

    if (error) {
      dispatch(initError());
    }
    if (items.length > 0) {
      let editMode = false;
      for (let el in items) {
        editMode = items[el].editMode || editMode;
      }

      if (editMode) {
        const initialItems = items.map(el => {
          return {
            ...el,
            editMode: false
          };
        });
        dispatch(initEditMode(initialItems));
      }
    }
    else { return }
  };
}

export const newItem = (item, token) => {
  return dispatch => {
    dispatch(newItemStart());

    addItem(item, token)
      .then(response => {
        dispatch(newItemSuccess());
      })
      .catch(error => {
        const errMessage = error.response.data.error;

        dispatch(newItemFail(errMessage));
      })
  };
}

// Fetching items from firebase
export const fetchDataStart = () => {
  return {
    type: actions.FETCH_DATA_START
  };
}

export const fetchDataSuccess = (items, collections) => {
  return {
    type: actions.FETCH_DATA_SUCCESS,
    items: items,
    collections: collections
  };
}

export const fetchDataFail = error => {
  return {
    type: actions.FETCH_DATA_FAIL,
    error: error
  };
}

export const setData = (user, response) => {
  let items = [];
  let collections = [];
  let itemsTimestampsArray = [];
  let collectionsTimestampsArray = [];
  let data = response.data;

  // Get the same directory as when signing in - fetching items list through gift ideas page for not authenticated user
  if (user) {
    for (let el in data) {
      data = data[el];
      break
    }
  }

  if (data) {
    for (let el in data.items) {
      items.push({
        ...data.items[el],
        id: el
      });
      itemsTimestampsArray.push(data.items[el].timestamp);
    }
    for (let el in data.collections) {
      collections.push({
        ...data.collections[el],
        id: el
      });
      collectionsTimestampsArray.push(data.collections[el].timestamp);
    }
    itemsTimestampsArray.sort().reverse();
    collectionsTimestampsArray.sort().reverse();

    // Sort items descending due to creation time
    items = sortItems(itemsTimestampsArray, items);
    collections = sortItems(collectionsTimestampsArray, collections);

    return {
      items,
      collections
    };
  }
}

export const fetchData = (userId, user, partEmail) => {
  return dispatch => {
    dispatch(fetchDataStart());

    fetchUserData(user, partEmail, userId)
      .then(response => {
        const { items, collections } = setData(user, response);

        dispatch(fetchDataSuccess(items, collections));
      })
      .catch(error => {
        const errMessage = error.response.data.error;
        dispatch(fetchDataFail(errMessage));
      })
  };
}

// Deleting item from firebase and redux state
export const deleteItemStart = () => {
  return {
    type: actions.DELETE_ITEM_START
  };
}

export const deleteItemSuccess = items => {
  return {
    type: actions.DELETE_ITEM_SUCCESS,
    items: items
  };
}

export const deleteItemFail = error => {
  return {
    type: actions.DELETE_ITEM_FAIL,
    error: error
  };
}

export const deleteItem = (id, token, items, partEmail, userId) => {
  return dispatch => {
    dispatch(deleteItemStart());

    const queryParams = id + '.json?auth=' + token;

    deleteUserItem(partEmail, userId, queryParams)
      .then(response => {
        items = items.filter(el => el.id !== id);
        dispatch(deleteItemSuccess(items));
      })
      .catch(error => {
        const errMessage = error.response.data.error;
        dispatch(deleteItemFail(errMessage));
      })
  };
}

// Edit list item
export const setItemEditMode = (id, items) => {
  const itemIndex = items.findIndex(el => el.id === id);
  const item = items.find(el => el.id === id);
  const initialItems = items.map(el => {
    return {
      ...el,
      editMode: false
    };
  });

  if (!item.editMode) {
    item.editMode = !item.editMode;
    initialItems[itemIndex] = item;
  }

  return {
    type: actions.SET_ITEM_EDIT_MODE,
    items: initialItems
  };
}

export const updateItemStart = () => {
  return {
    type: actions.UPDATE_ITEM_START
  };
}

export const updateItemSuccess = items => {
  return {
    type: actions.UPDATE_ITEM_SUCCESS,
    items: items
  };
}

export const updateItemFail = error => {
  return {
    type: actions.UPDATE_ITEM_FAIL,
    error: error
  };
}

export const updateItem = (item, items, updatedItemId, token, partEmail, userId) => {
  return dispatch => {
    dispatch(updateItemStart());

    const queryParams = updatedItemId + '.json?auth=' + token;

    updateUserItem(partEmail, userId, queryParams, item)
      .then(response => {
        dispatch(updateItemSuccess(items));
      })
      .catch(error => {
        const errorMessage = error.response.data.error;
        dispatch(updateItemFail(errorMessage));
      })
  };
}

// Add new collection to firebase
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
