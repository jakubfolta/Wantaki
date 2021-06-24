import React, { Fragment } from 'react';

const ListCollections = props => (
  <Fragment>
    <h2 className="list_title">Collections</h2>
    <ul className="list list--collections">
      {props.children}
    </ul>
  </Fragment>
)

export default ListCollections;