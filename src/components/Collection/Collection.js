import React from 'react';

const Collection = props => (
  <div
    onClick={props.handleClick}>
    {props.name}
    {props.children}
  </div>
)

export default Collection;