import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../UI/Spinner';
import ListCollection from './ListCollection/ListCollection';

class ListCollections extends Component {
  state = {
    itemsBoxOpen: false
  }

  onAddItemsToCollectionHandler = (id) => {
    this.setState({ itemsBoxOpen: true });

  }

  render() {
    let items = this.props.loadingCollections
    ? <Spinner />
    : this.props.collections.map(el =>
      <ListCollection
        id={el.id}
        key={el.id}
        handleAdd={() => this.onAddItemsToCollectionHandler(el.id)}
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

    return collections;
  }
}

const mapStateToProps = state => {
  return {
    collections: state.items.collections,
    loadingCollections: state.items.loadingCollections
  }
}

export default connect(mapStateToProps)(ListCollections);