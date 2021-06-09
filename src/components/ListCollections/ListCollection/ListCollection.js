import React from 'react';
import { ImFire } from 'react-icons/im';

const ListCollection = props => (
  <div
    id={props.id}
    tabIndex="0"
    className="collection"
    onClick={props.handleClick}>
    <h2 className="collection_name">{props.name}</h2>
    <button className="collection_icon">
      <ImFire />
    </button>
  </div>
)

export default ListCollection;