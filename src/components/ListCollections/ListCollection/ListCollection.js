import React from 'react';
import { connect } from 'react-redux';
// import { FaShareAlt, FaEdit } from 'react-icons/fa';
// import { IconContext } from "react-icons";
import { AiOutlinePlus } from 'react-icons/ai';

const ListCollection = props => (
  <li
    id={props.id}
    tabIndex="0"
    className="list_collection">
    <h2
      className="list_collection_name"
      onClick={props.handleCollectionClick}>{props.name}</h2>
    {/* <button
      className="list_collection_button list_collection_button--copy"
      onClick={props.handleCopy}>
      <IoCopySharp />
      Copy link
    </button> */}
    <button
      className="list_collection_button"
      onClick={(e) => props.handleButtonClick(e.target.tagName)}
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