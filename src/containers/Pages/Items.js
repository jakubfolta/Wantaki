import React, { Fragment, Component } from 'react';

class Items extends Component {
  state = {
    items: []
  }

  render() {
    return (
      <Fragment>
        <h1 className="page-heading">Your future items</h1>
      </Fragment>
    );
  }
}

export default Items;