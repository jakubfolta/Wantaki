import React, { Fragment } from 'react';

import NavigationItems from '../../components/Navigation/NavigationItems';

const Layout = props => {
  return (
    <Fragment>
      <header className="header">
        <NavigationItems />
      </header>
      <main className="layout">
        <section className="section">
          {props.children}
        </section>
      </main>
    </Fragment>
  );
}

export default Layout;

