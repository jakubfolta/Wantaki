import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Home from './containers/Pages/Home';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Home />
        </Layout>
      </div>
    );
  }
}

export default App;
