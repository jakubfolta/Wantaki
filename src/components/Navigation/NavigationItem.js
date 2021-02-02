import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => (
  <li className="navigation_item">
    <NavLink className="navigation_item-link" to={props.link}>
      {props.children}
    </NavLink>
  </li>
)

export default NavigationItem;