import React from 'react';
import { connect } from 'react-redux';

import { BiCopy, BiDotsVertical } from 'react-icons/bi';
import Button from '../UI/Button';
// import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ListItem from '../ListItems/ListItem/ListItem';
// import Spinner from '../UI/Spinner';

const ItemsInCollection = props => {
  const collection = props.collectionId
    ? props.collections.filter(collection => collection.id === props.collectionId)[0]
    : null;
  console.log(collection);

  const [buttonDescription, glitchButton] = props.copied
    ? ['Copied', <span className="button_glitch"></span>]
    : ['Copy link to collection', null];

  // const confirmationModalDescription = props.collections.some(collection => collection.id === props.collectionId)
  // ? `Are you sure you want to delete "${collection.name}" collection with all its items?`
  // : 'Deleted'
  //   ? collection.items.length > 0

  const items = props.visible && collection.items.length > 0
    ? collection.items.map(item => (
      <ListItem
        id={item.id}
        key={item.id}
        name={item.name}
        link={item.link}>

        <div className="list_item-group">
          <Button
            type="button"
            btnType="delete"
            clicked={() => props.handleRemoveClick(item.id)}>Remove</Button>
        </div>
      </ListItem>
    ))
    : <span className="itemsInCollection_emptySpan">Empty</span>

    console.log(items);

  return (
    props.visible
    ? <div className="itemsInCollection">
        <h3 className="itemsInCollection_title">{collection.name}
          <span
            className="itemsInCollection_dots-icon"
            onClick={props.handleMenuClick}>
            <BiDotsVertical />
          </span>
        </h3>

        {props.menuVisible
          ? <div
              className="itemsInCollection_backdrop"
              onClick={props.handleBackdropClick}>
              <div className="itemsInCollection_menu">
                <Button
                  type="button"
                  btnType="itemsInCollection_menuButton"
                  // id="copyCollectionLinkButton"
                  clicked={props.handleRenameClick}>
                  Rename
                </Button>
                <Button
                  type="button"
                  btnType="itemsInCollection_menuButton"
                  // id="copyCollectionLinkButton"
                  clicked={props.handleDeleteClick}>
                  Delete collection
                </Button>
              </div>
            </div>
          : null}

        {/* {props.warningBoxVisible
          ? <ConfirmationModal
              title="!!! Warning !!!"
              description={confirmationModalDescription}
              onConfirmClick={props.handleConfirmClick}
              onAbortClick={props.handleAbortClick}>
              {props.loadingDelete ? <Spinner/> : null}
            </ConfirmationModal>
          : null} */}


        <div className="itemsInCollection_list">
          {items}

          <Button
            type="button"
            btnType="itemsInCollection_copyButton"
            id="copyCollectionLinkButton"
            clicked={props.handleCopyClick}>
            <span className="itemsInCollection_copyButton-icon">
              <BiCopy />
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
    collections: state.items.collections,
    // loadingDelete: state.items.isloadingDeleteCollection
  };
}

export default connect(mapStateToProps)(ItemsInCollection);