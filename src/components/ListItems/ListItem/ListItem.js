import React from 'react';

import Button from '../../UI/Button';

const ListItem = props => (
  <li className="list_item">
    <div className="list_item-group">
      <a className="list_item-link" href={props.link} target="_blank" rel="noopener noreferrer">
        {props.name}
        <p className="list_item-description">{props.description}</p>
      </a>

    </div>

    <div className="list_item-group">
      <Button
        btnType="delete"
        clicked={props.delete}>Delete</Button>
      <Button
        btnType="edit"
        clicked={props.edit}>Edit</Button>
    </div>
  </li>
)

export default ListItem;