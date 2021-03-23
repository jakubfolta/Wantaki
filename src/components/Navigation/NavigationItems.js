import React from 'react';
import NavigationItem from './NavigationItem';
import { connect } from 'react-redux';

const NavigationItems = props => (
  <nav className="navigation">
    <ul className="navigation_list">
      <NavigationItem id="home" link="/">
        Home
      </NavigationItem>

      {props.isAuthenticated
        ? <NavigationItem id="logout" link="/logout">
          Logout
          </NavigationItem>
        : <NavigationItem id="auth" link="/auth">
          Sign In
          </NavigationItem>}

      {props.isAuthenticated
        ? <NavigationItem id="items" link="/items">
          Items
        </NavigationItem>
        : null}
    </ul>
  </nav>
)

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(NavigationItems);