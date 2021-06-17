import React from 'react';
import { FaShareAlt, FaEdit } from 'react-icons/fa';
import { SiAddthis } from 'react-icons/si';

const ListCollection = props => (
  <li
    id={props.id}
    tabIndex="0"
    className="list_collection"
    onClick={props.handleClick}>
    <button
      className="list_collection_button list_collection_button--add"
      onClick={props.handleAdd}>
      <SiAddthis />
    </button>
    <h2 className="list_collection_name">{props.name}</h2>
    <button
      className="list_collection_button list_collection_button--copy"
      onClick={props.handleCopy}>
      Copy link
    </button>
  </li>
)

export default ListCollection;