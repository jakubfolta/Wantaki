import React, { Component, Fragment } from 'react';

class Layout extends Component {
  state = {

  }

  render() {

    return (
    <Fragment>
      <main className="layout">
        {this.props.children}
      </main>
    </Fragment>
    )
  }
}

export default Layout;

