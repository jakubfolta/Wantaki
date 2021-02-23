import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './store/actions';

import Layout from './components/Layout/Layout';
import Home from './containers/Pages/Home';
import Items from './containers/Pages/Items';
import Auth from './containers/Pages/Auth/Auth';
import Logout from './containers/Pages/Auth/Logout/Logout';


class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {
    let routes = this.props.isAuthenticated
      ? <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth}  />
        <Route path="/logout" component={Logout}  />
        <Route path="/items" component={Items} />
        <Redirect to="/" />
      </Switch>
      : <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth}  />
        {/* "items" available for development purposes */}
        <Route path="/items" component={Items} />
        <Redirect to="/" />
      </Switch>

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(authActions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
