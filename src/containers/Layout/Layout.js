import React, { Component, Fragment } from 'react';

import NavigationItems from '../../components/Navigation/NavigationItems';

class Layout extends Component {
  state = {

  }

  render() {

    return (
    <Fragment>
      <header className="header">
        <NavigationItems />
      </header>
      <main className="layout">
        {this.props.children}
      </main>
    </Fragment>
    )
  }
}

export default Layout;

