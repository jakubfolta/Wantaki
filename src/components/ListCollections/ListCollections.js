import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as collectionsActions from '../../store/actions';

import Spinner from '../UI/Spinner';
import Backdrop from '../Backdrop/Backdrop';
import ItemsAvailable from '../ItemsAvailable/ItemsAvailable';
import ItemsInCollection from '../ItemsInCollection/ItemsInCollection';
import ListCollection from './ListCollection/ListCollection';

class ListCollections extends Component {
  state = {
    availableItemsBox: {
      visibilityState: false,
      openingCollectionId: ''
    },
    itemsInCollectionBox: {
      visibilityState: false,
      openingCollectionId: ''
    },
    selectedItemsIds: [],
    itemsAddedToCollection: false,
    collectionLinkCopied: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collections !== this.props.collections && this.state.availableItemsBox.visibilityState) {
      this.setState({itemsAddedToCollection: true});
      this.resetState();
    }
  }

  resetState = () => {
    setTimeout(() => {
      const availableItemsBoxCopy = {...this.state.availableItemsBox};

      availableItemsBoxCopy.visibilityState = false;
      availableItemsBoxCopy.openingCollectionId = '';

      this.setState({availableItemsBox: availableItemsBoxCopy, itemsAddedToCollection: false, selectedItemsIds: []});
    }, 2000);
  }

  switchItemsBox = (tagName = null, id = '') => {
    const boxToOpen = tagName === 'BUTTON' ? 'availableItemsBox' : 'itemsInCollectionBox';
    const boxToClose = this.state.availableItemsBox.visibilityState ? 'availableItemsBox' : 'itemsInCollectionBox';

    const boxToSwitch = tagName ? boxToOpen : boxToClose;

    this.setState(prevState => {
      const boxCopy = {...this.state.[boxToSwitch]};

      boxCopy.visibilityState = !prevState.[boxToSwitch].visibilityState;
      boxCopy.openingCollectionId = id;

      return {
        [boxToSwitch]: boxCopy,
        selectedItemsIds: []
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
      this.setState({collectionLinkCopied: true});
      setTimeout(() => {
        this.setState({collectionLinkCopied: false});
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

  // onDeleteCollectionHandler = id => {
  //   this.props.onDeleteCollection(this.props.partEmail, this.props.userId, this.props.token, id, this.props.collections);
  // }

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

    return (
      <Fragment>
        {collections}
        <Backdrop
          visible={this.state.availableItemsBox.visibilityState || this.state.itemsInCollectionBox.visibilityState}
          handleClick={() => this.switchItemsBox()}>
        </Backdrop>
        <ItemsAvailable
          visible={this.state.availableItemsBox.visibilityState}
          onCheckedItem={this.getSelectedItems}
          itemsChecked={this.state.selectedItemsIds.length > 0}
          clicked={this.onAddItemsToCollectionHandler}
          itemsAdded={this.state.itemsAddedToCollection}/>
        <ItemsInCollection
          visible={this.state.itemsInCollectionBox.visibilityState}
          collectionId={this.state.itemsInCollectionBox.openingCollectionId}
          handleCopyClick={this.copyCollectionLink}
          copied={this.state.collectionLinkCopied}
          onRemoveClick={this.onRemoveItemFromCollectionHandler}/>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items,
    collections: state.items.collections,
    loadingCollections: state.items.loadingCollections,
    token: state.auth.token,
    userId: state.auth.userId,
    uuid: state.auth.user.uuid,
    partEmail: state.auth.partEmail
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddItemsToCollection: (partEmail, userId, token, collectionId, collectionWithItems, updatedItems, collections) => dispatch(collectionsActions.addItemsToCollection(partEmail, userId, token, collectionId, collectionWithItems, updatedItems, collections)),
    onRemoveItemFromCollection: data => dispatch(collectionsActions.removeItemFromCollection(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCollections));