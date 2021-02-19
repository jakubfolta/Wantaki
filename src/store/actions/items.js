import * as actions from './actionTypes';
import axios from 'axios';

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

export const newItem = (item, token) => {
  return dispatch => {
    dispatch(newItemStart());

    axios.post('https://what-i-desire-default-rtdb.firebaseio.com/items.son?auth=' + token, item)
      .then(response => {
        console.log(response);
        dispatch(newItemSuccess(item, response.data.name));
      })
      .catch(error => {
        const errMessage = error.response;
        dispatch(newItemFail(errMessage));
      })
  }
};