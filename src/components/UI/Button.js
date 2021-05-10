import React from 'react';

const Button = props => (
  <button
    type={props.type}
    id={props.id}
    className={["button", props.btnType].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}>
    {props.children}
    <span className="button_label">{props.label}</span>
  </button>
)

export default Button;