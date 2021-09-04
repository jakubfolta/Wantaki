import React from 'react';
import { connect } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';

const ListCollection = props => (
  <li
    id={props.id}
    tabIndex="0"
    className="list_collection">
    <h2
      className="list_collection_name"
      onClick={e => props.handleCollectionClick(e.target.tagName)}>{props.name}</h2>
    <button
      className="list_collection_button"
      onClick={e => props.handleButtonClick(e.target.tagName)}
      disabled={props.items.length === 0}>
      <span className="list_collection_button--icon">
        <AiOutlinePlus />
      </span>
      Add items
    </button>
  </li>
)

const mapStateToProps = (state) => {
  return {
    items: state.items.items
  };
}

export default connect(mapStateToProps)(ListCollection);