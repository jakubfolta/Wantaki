import React from 'react';

const Input = props => {
  let inputElement = null

  switch (props.type) {
    case 'text':
      inputElement = <input
        onChange={props.change}
        className="items-form_input"
        value={props.value}
        placeholder={props.placeholder} />;
      break;
    case 'textarea':
      inputElement = <textarea
        onChange={props.change}
        className="items-form_textarea"
        value={props.value}
        placeholder={props.placeholder} />
      break;
    default: inputElement = <input
      onChange={props.change}
      className="items-form_input"
      value={props.value}
      placeholder={props.placeholder} />;
  }

  return (
    <div className="items-form_group">
      <label className="items-form_label">
        {props.label}
        {inputElement}
      </label>
    </div>
  );
}

export default Input
