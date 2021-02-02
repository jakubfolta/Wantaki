import React from 'react';
import NavigationItem from './NavigationItem';

const NavigationItems = () => {
  return (
    <nav className="navigation">
      <ul className="navigation_list">
        <NavigationItem link="/auth">
          Log In / Sign Up
        </NavigationItem>
        <NavigationItem link="/items">
          Items
        </NavigationItem>
        <NavigationItem link="/logout">
          Logout
        </NavigationItem>
      </ul>
    </nav>
  )
}

export default NavigationItems;