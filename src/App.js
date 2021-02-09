import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './containers/Pages/Home';
import Items from './containers/Pages/Items';
import Auth from './containers/Pages/Auth/Auth';


class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/items" component={Items} />
            <Route path="/auth" component={Auth}  />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
