import React from 'react';

const Backdrop = props => {
  return (
    props.visible
    ? <div
      className="backdrop"
      onClick={props.handleClick}>
      {props.children}
      </div>
    : null
  );
}

export default Backdrop;