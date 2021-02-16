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

  }

  render() {
    let routes = this.props.isAuthenticated
      ? <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/items" component={Items} />
        <Route path="/logout" component={Logout}  />
        <Redirect to="/" />
      </Switch>
      : <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth}  />
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
    isAuthenticated: state.token !== null
  };
};

export default connect(mapStateToProps)(App);
