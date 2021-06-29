import React from 'react';
import { connect } from 'react-redux';

import Spinner from '../UI/Spinner';
import ListCollection from './ListCollection/ListCollection';

const ListCollections = props => {
  let items = props.loadingCollections
    ? <Spinner />
    : props.collections.map(el =>
        <ListCollection
          id={el.id}
          key={el.id}
          // handleClick={}
          // handleDelete={() => this.onDeleteCollectionHandler(el.id)}
          // handleCopy={() => this.onCopyCollectionHandler(el.id)}
          name={el.name}/>
      );

  const collections = props.collections.length > 0
    ? ( <ul className="list list--collections">
          <h2 className="list_title">Collections</h2>
          {items}
        </ul> )
    : null;

  return collections;
}

const mapStateToProps = state => {
  return {
    collections: state.items.collections,
    loadingCollections: state.items.loadingCollections
  }
}

export default connect(mapStateToProps)(ListCollections);