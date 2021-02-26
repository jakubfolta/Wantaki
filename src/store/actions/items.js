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
    axios.get('https://what-i-desire-default-rtdb.firebaseio.com/items.json' + queryParams)
      .then(response => {
        let items = [];

        for (let el in response.data) {
          items.push({
            ...response.data[el],
            id: el
          })
        }

        dispatch(fetchItemsSuccess(items));
      })
      .catch(error => {
        dispatch(fetchItemsFail(error));
      })
  }
}





































// export const fetchItemsStart = () => {
//   return {
//     type: actions.FETCH_ITEMS_START
//   };
// };
//
// export const fetchItemsSuccess = items => {
//   return {
//     type: actions.FETCH_ITEMS_SUCCESS,
//     items: items
//   };
// };
//
// export const fetchItemsFail = error => {
//   return {
//     type: actions.FETCH_ITEMS_FAIL,
//     error: error
//   };
// };
//
// export const fetchItems = userId => {
//   return dispatch => {
//     dispatch(fetchItemsStart());
//
//     const queryParams = '?orderBy="userId"&equalTo="' + userId + '"';
//
//     axios.get('https://what-i-desire-default-rtdb.firebaseio.com/items.json' + queryParams)
//       .then(response => {
//         console.log(response);
//         const fetchedItems = [];
//
//         for (let el in response.data) {
//           console.log(response.data[el]);
//           fetchedItems.push({
//             ...response.data[el],
//             id: el
//           });
//         }
//
//         dispatch(fetchItemsSuccess(fetchedItems));
//       })
//       .catch(error => {
//         const messError = error.response.data.error;
//         console.log(messError);
//         dispatch(fetchItemsFail(messError));
//       })
//   };
// };
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
