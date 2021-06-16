import React from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { SiAddthis } from 'react-icons/si';

const ListCollection = props => (
  <div
    id={props.id}
    tabIndex="0"
    className="list_collection"
    onClick={props.handleClick}>
    <h2 className="list_collection_name">{props.name}</h2>
    <button
      className="list_collection_icon list_collection_icon--delete"
      onClick={props.handleDelete}>
      <FaTimes />
    </button>
    <button
      className="list_collection_icon list_collection_icon--edit"
      onClick={props.handleEdit}>
      <FaEdit />
    </button>
    <button
      className="list_collection_icon list_collection_icon--add"
      onClick={props.handleAdd}>
      <SiAddthis />
    </button>
  </div>
)

export default ListCollection;