import React from 'react';

const ListCollections = props => (
  <ul className="list list--collections">
    <h2 className="list_title">Collections</h2>
    {props.children}
  </ul>
)

export default ListCollections;