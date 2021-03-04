import React from 'react';

const ListItem = props => (
  <li className="list_item">
    <div className="list_item-group">
      <a className="list_item-link" href={props.link} target="_blank" rel="noopener noreferrer">
        {props.name}
        <p className="list_item-description">{props.description}</p>
      </a>
    </div>

    <div className="list_item-group">
      {props.children}
    </div>
  </li>
)

export default ListItem;