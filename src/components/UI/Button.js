import React from 'react';

const Button = props => (
  <button
    type={props.type}
    id={props.id}
    data-theme={props.dataTheme}
    className={["button", props.btnType].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}>
    {props.children}
  </button>
)

export default Button;