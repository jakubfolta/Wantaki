import React from 'react';

const ListItems = props => (
  <ul className="list">
    {props.children}
  </ul>
)

export default ListItems;