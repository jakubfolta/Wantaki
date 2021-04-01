import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './store/actions';

import Layout from './components/Layout/Layout';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Home from './containers/Pages/Home';
import Logout from './containers/Pages/Auth/Logout/Logout';

const Auth = React.lazy(() => import('./containers/Pages/Auth/Auth'));
const Items = React.lazy(() => import('./containers/Pages/Items'));
const GiftIdeas = React.lazy(() => import('./containers/Pages/GiftIdeas'));
const authSuspense = <Suspense fallback=<div>Loading...</div>><Auth /></Suspense>;
const itemsSuspense = <Suspense fallback=<div>Loading...</div>><Items /></Suspense>;
const giftIdeasSuspense = <Suspense fallback=<div>Loading...</div>><GiftIdeas /></Suspense>;
let prevPage = '';
let routes;

class App extends Component {
  state = {
    load: false
  }

  componentDidMount() {
    this.props.onCheckAuthState();
    prevPage = this.props.location.pathname;

    setTimeout(() => {
      // this.setState({ load: true });
    }, 2000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated === true && this.props.isAuthenticated === false) {
      document.getElementById("auth").childNodes[0].blur();
    }
  }

  render() {
// Redirect back to "/items" route if refresh webpage on this "/items" route
// Previously root route "/" loaded due to route guards
    let redirect = this.props.isAuthenticated && prevPage === '/items'
      ? <Redirect to={prevPage} />
      : null;

    if (this.state.load) {
      routes = this.props.isAuthenticated
      ? <Switch>
        <Route path="/" exact component={Home} />
        {/* /auth available to apply redirect after log in */}
        <Route path="/auth" render={() => authSuspense}  />
        <Route path="/logout" component={Logout}  />
        <Route path="/items" render={() => itemsSuspense} />
        <Route path="/giftideas" render={() => giftIdeasSuspense} />
        <Redirect to="/" />
      </Switch>
      : <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" render={() => authSuspense}  />
        <Route path="/giftideas" render={() => giftIdeasSuspense} />
        <Redirect to="/" />
      </Switch>;
    } else {
      routes = <LoadingPage />
    }

    return (
      <div>
        <Layout>
          {routes}
          {redirect}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(authActions.checkAuthState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
