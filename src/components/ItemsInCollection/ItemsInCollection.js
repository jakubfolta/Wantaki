import React from 'react';
import { connect } from 'react-redux';

import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../UI/Button';
import ListItem from '../ListItems/ListItem/ListItem';

const ItemsInCollection = props => {
  const collection = props.collectionId
  ? props.collections.filter(collection => collection.id === props.collectionId)[0]
  : null;
  console.log(collection);

  const buttonDescription = 'Copy link to this collection';


  return (
    props.visible
    ? <div className="itemsInCollection">
        <h3 className="itemsInCollection_title">{`${collection.name}`}</h3>
        <div className="itemsInCollection_list">
          {collection.items.map(item => (
            <ListItem
              id={item.id}
              key={item.id}
              name={item.name}
              link={item.link}
              description={item.description}>

              <div className="list_item-group">
                <Button
                  type="button"
                  btnType="delete"
                  clicked={() => props.delete(item.id)}>Remove</Button>
              </div>
            </ListItem>
          ))}

          <Button
            type="button"
            btnType="itemsInCollection_button"
            clicked={props.clicked} >
            <span className="itemsInCollection_button-icon">
              <AiOutlinePlus />
            </span>
            {/* {glitchButton} */}
            {buttonDescription}
          </Button>
        </div>
      </div>
    : null
  );
}

const mapStateToProps = state => {
  return {
    collections: state.items.collections
  };
}

export default connect(mapStateToProps)(ItemsInCollection);