import React from 'react';
import { connect } from 'react-redux';
import * as itemsActions from '../../store/actions';

import ListItem from './ListItem/ListItem';
import Spinner from '../UI/Spinner';
import Button from '../UI/Button';

const ListItems = props => {
  let items;

  if (props.loadingItems) {
    items = <Spinner />;
  } else if (props.items.length > 0) {
      items = (
        <ul className="list">

          {props.items.map((el, index) =>
            <ListItem
              id={el.id}
              key={el.id}
              name={el.name}
              link={el.link}
              description={el.description}>

              <div className="list_item-group">
                <Button
                  type="button"
                  btnType="delete"
                  //  Move methods from items ...........................
                  clicked={() => this.onDeleteItemHandler(el.id)}>Delete</Button>

                <Button
                  type="button"
                  btnType="edit"
                  clicked={props.items[index].editMode
                    ? (e) => this.onCancelEditHandler(e, el.id)
                    : (e) => this.onEditItemHandler(e, el.id)}>
                    {!props.items[index].editMode ? 'Edit' : 'Cancel'}</Button>
              </div>
            </ListItem>
          )}

        </ul>
      );
  } else {
      items = null;
  }

  return items;
}

const mapStateToProps = state => {
  return {
    items: state.items.items,
    collections: state.items.collections,
    error: state.items.error,
    fetchingError: state.items.fetchingError,
    loading: state.items.loading,
    loadingItems: state.items.loadingItems,
    token: state.auth.token,
    userId: state.auth.userId,
    uuid: state.auth.user.uuid,
    partEmail: state.auth.partEmail
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNewItem: (item, token) => dispatch(itemsActions.newItem(item, token)),
    onSetInitialState: (error, items) => dispatch(itemsActions.setInitialState(error, items)),
    onFetchData: (userId, partEmail) => dispatch(itemsActions.fetchData(userId, null, partEmail)),
    onDeleteItem: (id, token, items, partEmail, userId) => dispatch(itemsActions.deleteItem(id, token, items, partEmail, userId)),
    onSetItemEditMode: (id, items) => dispatch(itemsActions.setItemEditMode(id, items)),
    onUpdateItem: (updatedItem, updatedItems, updatedItemId, token, partEmail, userId) => dispatch(itemsActions.updateItem(updatedItem, updatedItems, updatedItemId, token, partEmail, userId)),
    onDeleteCollection: (partEmail, userId, token, id, collections) => dispatch(itemsActions.deleteCollection(partEmail, userId, token, id, collections))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);