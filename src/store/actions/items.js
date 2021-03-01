import * as actions from './actionTypes';
import axios from 'axios';

// Add new item to firebase
export const newItemStart = () => {
  return {
    type: actions.NEW_ITEM_START
  };
};

export const newItemSuccess = (item, id) => {
  const newItem = {
    ...item,
    itemId: id
  }
  console.log(newItem);

  return {
    type: actions.NEW_ITEM_SUCCESS,
    item: newItem
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
    type: actions.ITEMS_INIT_ERROR
  };
};

export const checkItemsErrorState = error => {
  return dispatch => {
    if (error) {
      dispatch(initError())
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
  }
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
  }
}

export const fetchItems = userId => {
  return dispatch => {
    dispatch(fetchItemsStart());

    const queryParams = '?orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://what-i-desire-default-rtdb.firebaseio.com/itms.json' + queryParams)
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
        const errMessage = error.response.data.error
        dispatch(fetchItemsFail(errMessage));
      })
  }
}

