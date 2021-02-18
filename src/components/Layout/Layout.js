import React, { Fragment } from 'react';

import NavigationItems from '../../components/Navigation/NavigationItems';

const Layout = props => {
  return (
    <Fragment>
      <header className="header">
        <NavigationItems />
      </header>
      <main className="layout">
        {props.children}
      </main>
    </Fragment>
  );
}

export default Layout;

