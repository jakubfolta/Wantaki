import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as collectionsActions from '../../store/actions';

import Spinner from '../UI/Spinner';
import Backdrop from '../Backdrop/Backdrop';
import ItemsAvailable from '../ItemsAvailable/ItemsAvailable';
import ItemsInCollection from '../ItemsInCollection/ItemsInCollection';
import ListCollection from './ListCollection/ListCollection';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

class ListCollections extends Component {
  state = {
    availableItemsBox: {
      isBoxVisible: false,
      openingCollectionId: ''
    },
    itemsInCollectionBox: {
      isBoxVisible: false,
      openingCollectionId: ''
    },
    selectedItemsIds: [],
    itemsAddedToCollection: false,
    isCollectionLinkCopied: false,
    isCollectionMenuVisible: false,
    isCollectionDeleted: false,
    isDeleteWarningBoxVisible: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collections !== this.props.collections && (this.state.availableItemsBox.isBoxVisible || prevProps.loadingDelete)) {
      const propertyToChange = this.state.isDeleteWarningBoxVisible
        ? 'isCollectionDeleted'
        : 'itemsAddedToCollection';
      console.log(propertyToChange);
      // console.log(prevState);

      this.setState({
        [propertyToChange]: true
      });
      this.resetState(propertyToChange);
    }
  }

  setPropertiesToReset = changedProperty => {
    console.log(changedProperty);
    if (changedProperty === 'isCollectionDeleted') return {isCollectionDeleted: false, isDeleteWarningBoxVisible: false};

    const availableItemsBoxCopy = {...this.state.availableItemsBox};

    availableItemsBoxCopy.isBoxVisible = false;
    availableItemsBoxCopy.openingCollectionId = '';

    const propertiesToReset = {
      availableItemsBox: availableItemsBoxCopy,
      itemsAddedToCollection: false,
      selectedItemsIds: []
    }
    return propertiesToReset;
  }

  resetState = changedProperty => {
    const propertiesToReset = this.setPropertiesToReset(changedProperty);

    console.log(propertiesToReset);
    setTimeout(() => {
      this.setState(propertiesToReset);
    }, 2000);
  }

  switchItemsBox = (tagName = null, id = '') => {
    const boxToOpen = tagName === 'BUTTON' ? 'availableItemsBox' : 'itemsInCollectionBox';
    const boxToClose = this.state.availableItemsBox.isBoxVisible ? 'availableItemsBox' : 'itemsInCollectionBox';

    const boxToSwitch = tagName ? boxToOpen : boxToClose;

    this.setState(prevState => {
      const boxCopy = {...this.state.[boxToSwitch]};

      boxCopy.isBoxVisible = !prevState.[boxToSwitch].isBoxVisible;
      boxCopy.openingCollectionId = id;

      return {
        [boxToSwitch]: boxCopy,
        selectedItemsIds: [],
        isCollectionMenuVisible: false,
        isDeleteWarningBoxVisible: false
      };
    })
  }

  getSelectedItems = () => {
    const selectedItems = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedItemsIds = [];

    selectedItems.forEach(el => {
      selectedItemsIds.push(el.id);
    });

    this.setState({selectedItemsIds: selectedItemsIds});
  }

  onAddItemsToCollectionHandler = () => {
    const selectedItems = this.props.items.filter(el => this.state.selectedItemsIds.includes(el.id) ? el : null);
    const updatedItems = this.props.items.filter(el => !this.state.selectedItemsIds.includes(el.id) ? el : null);
    const updatedCollection = this.props.collections.filter(el => el.id === this.state.availableItemsBox.openingCollectionId)[0];
    const collectionWithItems = {
      ...updatedCollection,
      items: updatedCollection.items
        ? [...updatedCollection.items,
          ...selectedItems]
        : [...selectedItems]
    };

    this.props.onAddItemsToCollection(this.props.partEmail, this.props.userId, this.props.token, this.state.availableItemsBox.openingCollectionId, collectionWithItems, updatedItems, this.props.collections);
  }

  copyCollectionLink = () => {
    const copyButton = document.getElementById('copyCollectionLinkButton');
    const baseURL = window.location.href.split(this.props.match.url)[0];

    navigator.clipboard.writeText(baseURL + `/giftideas?user=${this.props.uuid}&collection=${this.state.itemsInCollectionBox.openingCollectionId}`)
      .then(() => {
      this.setState({isCollectionLinkCopied: true});
      setTimeout(() => {
        this.setState({isCollectionLinkCopied: false});
        if (copyButton) copyButton.blur();
      }, 3000)
    })
      .catch(error => {
        alert(error);
      })
  }

  onRemoveItemFromCollectionHandler = id => {
    const collectionId = this.state.itemsInCollectionBox.openingCollectionId;
    const openedCollection = this.props.collections.filter(el => el.id === collectionId)[0];
    const updatedCollectionIndex =  this.props.collections.findIndex(el => el.id === collectionId);
    const updatedCollectionItems = openedCollection.items.filter(el => el.id !== id);
    const removedItem = openedCollection.items.filter(el => el.id === id)[0];

    const updatedCollection = {
      ...openedCollection,
      items: updatedCollectionItems
    };

    const collectionsCopy = [...this.props.collections];
    collectionsCopy[updatedCollectionIndex] = updatedCollection;

    const updatedCollections = collectionsCopy;
    const updatedItems = [...this.props.items, removedItem];

    const data = {
      partEmail: this.props.partEmail,
      userId: this.props.userId,
      token: this.props.token,
      collectionId: collectionId,
      updatedCollection: updatedCollection,
      updatedItems: updatedItems,
      updatedCollections: updatedCollections
    };

    this.props.onRemoveItemFromCollection(data);
  }

  switchMenuVisibility = () => {
    this.setState(prevState => {
      return {isCollectionMenuVisible: !prevState.isCollectionMenuVisible};
    })
  }

  onRenameCollectionHandler = e => {
    e.stopPropagation();
    console.log('Pressed');

  }

  onDeleteCollectionHandler = e => {
    e.stopPropagation();
    this.setState({isDeleteWarningBoxVisible: true});
  }

  onConfirmDeleteCollectionHandler = () => {
    const data = {
      partEmail: this.props.partEmail,
      userId: this.props.userId,
      token: this.props.token,
      id: this.state.itemsInCollectionBox.openingCollectionId,
      collections: this.props.collections
    }

    const collectionBoxCopy = {...this.state.itemsInCollectionBox};
    collectionBoxCopy.isBoxVisible = false;
    collectionBoxCopy.openingCollectionId = '';
    this.props.onDeleteCollection(data);
    this.setState({
      itemsInCollectionBox: collectionBoxCopy,
      isCollectionMenuVisible: false
    })

    // setTimeout(() => {
    //   this.setState({isDeleteWarningBoxVisible: false})
    // }, 2000)
  }

  onAbortDeleteCollectionHandler = () => {

  }

  render() {
    let items = this.props.loadingCollections
    ? <Spinner />
    : this.props.collections.map(el =>
      <ListCollection
        id={el.id}
        key={el.id}
        handleButtonClick={tagName => this.switchItemsBox(tagName, el.id)}
        handleCollectionClick={tagName => this.switchItemsBox(tagName, el.id)}
        // handleDelete={() => this.onDeleteCollectionHandler(el.id)}
        name={el.name}/>
      );

    const collections = this.props.collections.length > 0
    ? ( <ul className="list list--collections">
          <h2 className="list_title">Collections</h2>
          {items}
        </ul> )
    : null;

    const openedCollection = this.props.collections.filter(collection => collection.id === this.state.itemsInCollectionBox.openingCollectionId)[0];
    const confirmationModalDescription = openedCollection
      ? `Are you sure you want to delete "${openedCollection.name}" collection${openedCollection.items.length > 0
        ? ' with all its items?'
        : '?'}`
      : `${this.state.isCollectionDeleted ? 'Deleted' : 'Deleting...'}`;

    return (
      <Fragment>
        {collections}
        <Backdrop
          visible={this.state.availableItemsBox.isBoxVisible || this.state.itemsInCollectionBox.isBoxVisible}
          handleClick={() => this.switchItemsBox()}>
        </Backdrop>
        <ItemsAvailable
          visible={this.state.availableItemsBox.isBoxVisible}
          onCheckedItem={this.getSelectedItems}
          itemsChecked={this.state.selectedItemsIds.length > 0}
          clicked={this.onAddItemsToCollectionHandler}
          itemsAdded={this.state.itemsAddedToCollection}/>
        <ItemsInCollection
          visible={this.state.itemsInCollectionBox.isBoxVisible}
          collectionId={this.state.itemsInCollectionBox.openingCollectionId}
          handleCopyClick={this.copyCollectionLink}
          handleMenuClick={this.switchMenuVisibility}
          handleBackdropClick={this.switchMenuVisibility}
          handleRenameClick={this.onRenameCollectionHandler}
          handleDeleteClick={this.onDeleteCollectionHandler}
          handleRemoveClick={this.onRemoveItemFromCollectionHandler}
          // handleConfirmClick={this.onConfirmDeleteCollectionHandler}
          // handleAbortClick={this.onAbortDeleteCollectionHandler}
          menuVisible={this.state.isCollectionMenuVisible}
          // warningBoxVisible={this.state.isDeleteWarningBoxVisible}
          copied={this.state.isCollectionLinkCopied}/>
        <ConfirmationModal
          warningBoxVisible={this.state.isDeleteWarningBoxVisible}
          loading={this.props.loadingDelete || !this.state.itemsInCollectionBox.isBoxVisible}
          title="!!! Warning !!!"
          description={confirmationModalDescription}
          onConfirmClick={this.onConfirmDeleteCollectionHandler}
          onAbortClick={this.onAbortDeleteCollectionHandler}/>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items,
    collections: state.items.collections,
    loadingCollections: state.items.loadingCollections,
    loadingDelete: state.items.isLoadingDeleteCollection,
    token: state.auth.token,
    userId: state.auth.userId,
    uuid: state.auth.user.uuid,
    partEmail: state.auth.partEmail
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddItemsToCollection: (partEmail, userId, token, collectionId, collectionWithItems, updatedItems, collections) => dispatch(collectionsActions.addItemsToCollection(partEmail, userId, token, collectionId, collectionWithItems, updatedItems, collections)),
    onRemoveItemFromCollection: data => dispatch(collectionsActions.removeItemFromCollection(data)),
    onDeleteCollection: data => dispatch(collectionsActions.deleteCollection(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCollections));