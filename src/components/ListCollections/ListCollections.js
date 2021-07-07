import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Spinner from '../UI/Spinner';
import Backdrop from '../Backdrop/Backdrop';
import ItemsAvailable from '../ItemsAvailable/ItemsAvailable';
import ListCollection from './ListCollection/ListCollection';

class ListCollections extends Component {
  state = {
    itemsBoxOpen: false,
    selectedItemsIds: []
  }

  switchItemsBox = () => {
    this.setState(prevProps => {
      return {
        itemsBoxOpen: !prevProps.itemsBoxOpen,
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

    this.setState({ selectedItemsIds: selectedItemsIds });
  }

  render() {
    let items = this.props.loadingCollections
    ? <Spinner />
    : this.props.collections.map(el =>
      <ListCollection
        id={el.id}
        key={el.id}
        handleButtonClick={this.switchItemsBox}
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
          visible={this.state.itemsBoxOpen}
          handleClick={this.switchItemsBox}>
        </Backdrop>
        <ItemsAvailable
          visible={this.state.itemsBoxOpen}
          onCheckedItem={this.getSelectedItems}
          itemsChecked={this.state.selectedItemsIds.length > 0}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    collections: state.items.collections,
    loadingCollections: state.items.loadingCollections
  }
}

export default connect(mapStateToProps)(ListCollections);