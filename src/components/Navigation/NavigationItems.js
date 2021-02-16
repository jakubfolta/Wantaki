import React from 'react';
import NavigationItem from './NavigationItem';
import { connect } from 'react-redux';

const NavigationItems = props => (
  <nav className="navigation">
    <ul className="navigation_list">
      <NavigationItem link="/">
        Home
      </NavigationItem>

      {props.isAuthenticated
        ? <NavigationItem link="/logout">
          Logout
        </NavigationItem>
        : <NavigationItem link="/auth">
          Authenticate
        </NavigationItem>}

      {props.isAuthenticated
        ?<NavigationItem link="/items">
          Items
        </NavigationItem>
        : null}
    </ul>
  </nav>
)

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

export default connect(mapStateToProps)(NavigationItems);