import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ListCollection = props => (
  <div
    id={props.id}
    tabIndex="0"
    className="list_collection"
    onClick={props.handleClick}>
    <h2 className="list_collection_name">{props.name}</h2>
    <button
      className="list_collection_icon"
      onClick={props.handleDelete}>
      <FaTimes />
    </button>
  </div>
)

export default ListCollection;