import * as actions from './actionTypes';
import axios from 'axios';

// Add new item to firebase
export const newItemStart = () => {
  return {
    type: actions.NEW_ITEM_START
  };
};

export const newItemSuccess = item => {
  return {
    type: actions.NEW_ITEM_SUCCESS,
    item: item
  };
};

export const newItemFail = error => {
  return {
    type: actions.NEW_ITEM_FAIL,
    error: error
  };
};

export const initError = () => {
  return {
    type: actions.INIT_ERROR
  };
};

export const initEditMode = items => {
  return {
    type: actions.INIT_EDIT_MODE,
    items: items
  };
};

export const setInitialState = (error, items) => {
  return dispatch => {
    const initialItems = items.map(el => {
      return {
        ...el,
        editMode: false
      };
    });

    if (error) {
      dispatch(initError());
    }
    if (items.length > 0) {
      dispatch(initEditMode(initialItems));
    }
    else {
      return
    }
  };
};

export const newItem = (item, token) => {
  return dispatch => {
    dispatch(newItemStart());

    axios.post('https://what-i-desire-default-rtdb.firebaseio.com/items.json?auth=' + token, item)
      .then(response => {
        dispatch(newItemSuccess());
      })
      .catch(error => {
        const errMessage = error.response.data.error;
        dispatch(newItemFail(errMessage));
      })
  };
};

// Fetching items from firebase
export const fetchItemsStart = () => {
  return {
    type: actions.FETCH_ITEMS_START
  };
};

export const fetchItemsSuccess = items => {
  return {
    type: actions.FETCH_ITEMS_SUCCESS,
    items: items
  };
};

export const fetchItemsFail = error => {
  return {
    type: actions.FETCH_ITEMS_FAIL,
    error: error
  };
};

export const fetchItems = userId => {
  return dispatch => {
    dispatch(fetchItemsStart());

    const queryParams = '?orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://what-i-desire-default-rtdb.firebaseio.com/items.json' + queryParams)
      .then(response => {
        let items = [];
        let timestampsArray = [];
        let sortedItems = []

        for (let el in response.data) {
          items.push({
            ...response.data[el],
            id: el
          })
          timestampsArray.push(response.data[el].timestamp);
        }
        timestampsArray.sort().reverse();

// Sort items descending due to creation time
        for (let number of timestampsArray) {
          let itemIndex = items.findIndex(el => el.timestamp === number);
          sortedItems.push(items[itemIndex]);
        }
        dispatch(fetchItemsSuccess(sortedItems));
      })

      .catch(error => {
        const errMessage = error.response.data.error;
        dispatch(fetchItemsFail(errMessage));
      })
  };
};

// Deleting item from firebase and redux state
export const deleteItemStart = () => {
  return {
    type: actions.DELETE_ITEM_START
  };
};

export const deleteItemSuccess = items => {
  return {
    type: actions.DELETE_ITEM_SUCCESS,
    items: items
  };
};

export const deleteItemFail = error => {
  return {
    type: actions.DELETE_ITEM_FAIL,
    error: error
  };
};

export const deleteItem = (id, token, items) => {
  return dispatch => {
    dispatch(deleteItemStart());

    const queryParams = id + '.json?auth=' + token;
    axios.delete('https://what-i-desire-default-rtdb.firebaseio.com/items/' + queryParams)
      .then(response => {
        console.log(response);
        items = items.filter(el => el.id !== id);
        console.log(items);
        dispatch(deleteItemSuccess(items));
      })
      .catch(error => {
        const errMessage = error.response.data.error;
        dispatch(deleteItemFail(errMessage));
      })
  };
};

// Edit list item
export const editItemStart = (id, items) => {
  const itemIndex = items.findIndex(el => el.id === id);
  const item = items.find(el => el.id === id);
  const initialItems = items.map(el => {
    return {
      ...el,
      editMode: false
    };
  });

  item.editMode = !item.editMode;
  initialItems[itemIndex] = item;

  return {
    type: actions.EDIT_ITEM_START,
    items: initialItems
  };
};

// export const editItemSuccess = items => {
//   return {
//     type: actions.EDIT_ITEM_SUCCESS,
//     items: items
//   };
// };
//
// export const editItemFail = error => {
//   return {
//     type: actions.EDIT_ITEM_FAIL,
//     error: error
//   };
// };
//
// export const editItem = () => {
//   return dispatch => {
//     dispatch(editItemStart());
//
//
//   };
// };