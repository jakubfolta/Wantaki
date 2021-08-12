import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import * as itemsActions from '../../store/actions';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner';
import ListItems from '../../components/ListItems/ListItems';
import ListItem from '../../components/ListItems/ListItem/ListItem';

class GiftIdeas extends Component {
  componentDidMount() {
    const search = new URLSearchParams(this.props.location.search);
    const user = search.get('user');
    const collection = search.get('collection');

    this.props.onFetchData(user, collection);
  }

  render() {
    let items = null;

    let fetchingError = this.props.fetchingError
      ? <div className="error">{this.props.fetchingError}</div>
      : null;

// Create fetched items list WITHOUT buttons
    if (this.props.loadingItems) {
      items = <Spinner />;
    } else if (this.props.items.length > 0) {
        items = (
          <ListItems>
            {this.props.items.map((el, index) =>
              <ListItem
                class="list_item-gift"
                groupClass="list_item-group-gift"
                id={el.id}
                key={el.id}
                name={el.name}
                link={el.link}
                description={el.description}>
              </ListItem>
            )}
          </ListItems>
        );
      }

    return (
      <Fragment>
        <section className="section section--gifts">
          <h1 className="page-heading">Gift Ideas</h1>
          {fetchingError}
          {items}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items,
    fetchingError: state.items.fetchingError,
    loadingItems: state.items.loadingItems
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchData: (userName, collection) => dispatch(itemsActions.fetchData(null, userName, collection))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftIdeas));
