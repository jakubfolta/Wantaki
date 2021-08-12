import React from 'react';
import { connect } from 'react-redux';

import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../UI/Button';
import ListItem from '../ListItems/ListItem/ListItem';

const ItemsInCollection = props => {
  const collection = props.collectionId
  ? props.collections.filter(collection => collection.id === props.collectionId)[0]
  : null;

  const buttonDescription = props.copied
    ? 'Copied'
    : 'Copy link to this collection';

  const glitchButton = props.copied
    ? <span className="button_glitch"></span>
    : null;

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
              link={item.link}>

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
            btnType="itemsInCollection_copyButton"
            id="copyCollectionLinkButton"
            clicked={props.handleCopyClick} >
            <span className="itemsInCollection_copyButton-icon">
              <AiOutlinePlus />
            </span>
            {glitchButton}
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