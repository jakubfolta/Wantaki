import * as actions from './actionTypes';
import axios from 'axios';

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

    axios.post('https://what-i-desire-default-rtdb.firebaseio.com/users/' + item.partEmail + item.userId + '/items.json?auth=' + token, item)
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
export const fetchItemsStart = () => {
  return {
    type: actions.FETCH_ITEMS_START
  };
}

export const fetchItemsSuccess = items => {
  return {
    type: actions.FETCH_ITEMS_SUCCESS,
    items: items
  };
}

export const fetchItemsFail = error => {
  return {
    type: actions.FETCH_ITEMS_FAIL,
    error: error
  };
}

export const fetchItems = (userId, user, partEmail) => {
  return dispatch => {
    dispatch(fetchItemsStart());

    const url = user
      ? 'https://what-i-desire-default-rtdb.firebaseio.com/users.json?orderBy="uuid"&equalTo="' + user + '"'
      : 'https://what-i-desire-default-rtdb.firebaseio.com/users/' + partEmail + userId + '.json';

    axios.get(url)
      .then(response => {
        let items = [];
        let timestampsArray = [];
        let sortedItems = [];
        let data = response.data;

        // Get the same directory as when signing in
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
            })
            timestampsArray.push(data.items[el].timestamp);
          }
          timestampsArray.sort().reverse();

          // Sort items descending due to creation time
          for (let number of timestampsArray) {
            let itemIndex = items.findIndex(el => el.timestamp === number);
            sortedItems.push(items[itemIndex]);
          }
        }
        dispatch(fetchItemsSuccess(sortedItems));
      })

      .catch(error => {
        const errMessage = error.response.data.error;
        dispatch(fetchItemsFail(errMessage));
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

    axios.delete('https://what-i-desire-default-rtdb.firebaseio.com/users/' + partEmail + userId + '/items/' + queryParams)
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

    axios.put('https://what-i-desire-default-rtdb.firebaseio.com/users/' + partEmail + userId + '/items/' + queryParams, item)
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

export const newCollectionSuccess = () => {
  return {
    type: actions.NEW_COLLECTION_SUCCESS
  };
}

export const newCollectionFail = () => {
  return {
    type: actions.NEW_COLLECTION_FAIL
  };
}

export const newCollection = (token, partEmail, userId, collectionName) => {
  return dispatch => {
    dispatch(newCollectionStart());

    axios.post('https://what-i-desire-default-rtdb.firebaseio.com/users/' + partEmail + userId + '/collections.json?auth=' + token, item)
  };
}
