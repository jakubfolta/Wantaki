import React from 'react';
import NavigationItem from './NavigationItem';

const NavigationItems = () => (
  <nav className="navigation">
    <ul className="navigation_list">
      <NavigationItem link="/auth">
        Log In / Sign Up
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