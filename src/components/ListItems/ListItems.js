import React from 'react';
import { connect } from 'react-redux';

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
                  clicked={() => props.delete(el.id)}>Delete</Button>

                <Button
                  type="button"
                  btnType="edit"
                  clicked={props.items[index].editMode
                    ? (e) => props.cancel(e, el.id)
                    : (e) => props.edit(e, el.id)}>
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
    loading: state.items.loading
  };
}

export default connect(mapStateToProps)(ListItems);