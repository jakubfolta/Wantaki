import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as collectionsActions from '../../store/actions';

import Spinner from '../UI/Spinner';
import Backdrop from '../Backdrop/Backdrop';
import ItemsAvailable from '../ItemsAvailable/ItemsAvailable';
import ListCollection from './ListCollection/ListCollection';

class ListCollections extends Component {
  state = {
    itemsBox: {
      state: false,
      openingCollectionId: ''
    },
    selectedItemsIds: [],
    itemsAddedToCollection: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collections !== this.props.collections && this.state.itemsBox.state) {
      this.setState({itemsAddedToCollection: true});
      this.resetState();
    }
  }

  resetState = () => {
    setTimeout(() => {
      const itemsBoxCopy = {...this.state.itemsBox};

      itemsBoxCopy.state = false;
      itemsBoxCopy.openingCollectionId = '';

      this.setState({itemsBox: itemsBoxCopy, itemsAddedToCollection: false, selectedItemsIds: []});
    }, 2000);
  }

  switchItemsBox = (id = '') => {
    console.log(id);
    this.setState(prevState => {
      const itemsBoxCopy = {...this.state.itemsBox};

      itemsBoxCopy.state = !prevState.itemsBox.state;
      itemsBoxCopy.openingCollectionId = id;

      return {
        itemsBox: itemsBoxCopy,
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
    const updatedCollection = this.props.collections.filter(el => el.id === this.state.itemsBox.openingCollectionId)[0];
    const collectionWithItems = {
      ...updatedCollection,
      items: selectedItems
    }

    this.props.onAddItemsToCollection(this.props.partEmail, this.props.userId, this.props.token, this.state.itemsBox.openingCollectionId, collectionWithItems, this.props.collections);
  }

  render() {
    let items = this.props.loadingCollections
    ? <Spinner />
    : this.props.collections.map(el =>
      <ListCollection
        id={el.id}
        key={el.id}
        handleButtonClick={() => this.switchItemsBox(el.id)}
        // handleDelete={() => this.onDeleteCollectionHandler(el.id)}
        // handleCopy={() => this.onCopyCollectionHandler(el.id)}
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
          visible={this.state.itemsBox.state}
          handleClick={() => this.switchItemsBox()}>
        </Backdrop>
        <ItemsAvailable
          visible={this.state.itemsBox.state}
          onCheckedItem={this.getSelectedItems}
          itemsChecked={this.state.selectedItemsIds.length > 0}
          clicked={this.onAddItemsToCollectionHandler}
          itemsAdded={this.state.itemsAddedToCollection}/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items,
    collections: state.items.collections,
    loadingCollections: state.items.loadingCollections,
    token: state.auth.token,
    userId: state.auth.userId,
    partEmail: state.auth.partEmail
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddItemsToCollection: (partEmail, userId, token, collectionId, collectionWithItems, collections) => dispatch(collectionsActions.addItemsToCollection(partEmail, userId, token, collectionId, collectionWithItems, collections))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCollections);