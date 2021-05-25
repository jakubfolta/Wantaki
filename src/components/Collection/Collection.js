import React from 'react';
import { ImFire } from 'react-icons/im';

const Collection = props => (
  <div
    tabIndex="0"
    className="collection"
    onClick={props.handleClick}>
    <h2 className="collection_name">{props.name}</h2>
    <button className="collection_icon">
      <ImFire />
    </button>

    {props.children}
  </div>
)

export default Collection;