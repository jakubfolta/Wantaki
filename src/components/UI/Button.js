import React from 'react';

const Button = props => (
  <button
    id={props.id}
    className={["button", props.btnType].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}>
    <div className="button_content">
      {props.children}
    </div>
    <span className="button_label">{props.label}</span>
  </button>
)

export default Button;