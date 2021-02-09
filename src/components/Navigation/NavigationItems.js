import React from 'react';
import NavigationItem from './NavigationItem';

const NavigationItems = () => (
  <nav className="navigation">
    <ul className="navigation_list">
      <NavigationItem link="/">
        Home
      </NavigationItem>
      <NavigationItem link="/auth">
        Authenticate
      </NavigationItem>
      <NavigationItem link="/logout">
        Logout
      </NavigationItem>
      <NavigationItem link="/items">
        Items
      </NavigationItem>
    </ul>
  </nav>
)

export default NavigationItems;