import React from 'react';

const ListItem = props => {
  const classes = ["list_item", props.class];
  const groupClasses = ["list_item-group", props.groupClass];

  return (
    <li
      className={classes.join(' ')}
      id={props.id}>
      <div className={groupClasses.join(' ')}>
        <a className="list_item-link" href={props.link} target="_blank" rel="noopener noreferrer">
          {props.name}
          <p className="list_item-description">{props.description}</p>
        </a>
      </div>
      {props.children}
    </li>
  )
}

export default ListItem;