import React, { Fragment, Component } from 'react';
import * as itemsActions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import ListItems from '../../components/ListItems/ListItems';
import ListItem from '../../components/ListItems/ListItem/ListItem';


class Items extends Component {
  state = {
    newItemForm: {
      name: {
        type: 'text',
        value: '',
        placeholder: 'Quadra Type-66 "Javelina"',
        label: "What you desire ? *",
        valid: false,
        rules: {
          required: true,
          minLength: 6
        }
      },
      link: {
        type: 'text',
        value: '',
        placeholder: 'https://www.cybermazon.com',
        label: "Where can you buy it ?",
        valid: true
      },
      description: {
        type: 'textarea',
        value: '',
        placeholder: 'Turbo engine V-4x8, Arasaka spoiler, cybernitro.',
        label: "Additional description",
        valid: true
      }
    },
    formIsValid: false
  }

  componentDidMount() {
    this.props.onCheckErrorState(this.props.error);
    this.props.onFetchItems(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading === true) {
      this.props.onFetchItems(this.props.userId);
    }
  }

  newItemHandler = e => {
    e.preventDefault();

    const token = this.props.token;
    const itemData = {
      userId: this.props.userId,
      name: this.state.newItemForm.name.value,
      link: this.state.newItemForm.link.value,
      description: this.state.newItemForm.description.value,
      timestamp: Date.now()
    }

    this.props.onAddNewItem(itemData, token);
    this.resetValues();
  }

  resetValues = () => {
    const initialName = updateObject(this.state.newItemForm.name, { value: '' });
    const initialLink = updateObject(this.state.newItemForm.link, { value: '' });
    const initialDescription = updateObject(this.state.newItemForm.description, { value: '' });

    const initialInputs = updateObject(this.state.newItemForm, {
      name: initialName,
      link: initialLink,
      description: initialDescription
    });

    this.setState({newItemForm: initialInputs, formIsValid: false});
  }

  onChangeHandler = (e, id) => {
    const updatedElement = updateObject(this.state.newItemForm[id], {
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state.newItemForm[id].rules),
    });
    const updatedForm = updateObject(this.state.newItemForm, {
      [id]: updatedElement
    });

    let valid = true;
    for (let el in updatedForm) {
      valid = updatedForm[el].valid && valid;
    }

    this.setState({newItemForm: updatedForm, formIsValid: valid});
  }

  onDeleteItemHandler = (e, id) => {
    this.props.onDeleteItem(id, this.props.token);
    console.log(id);
  }

  render() {
    const form = this.state.newItemForm;
    const formElements = [];
    let items;

    let error = this.props.error
      ? <div className="error">{this.props.error}</div>
      : null;
    let fetchingError = this.props.fetchingError
      ? <div className="error">{this.props.fetchingError}</div>
      : null;

    for (let el in form) {
      formElements.push({
        id: el,
        configuration: form[el]
      })
    }

// Create "Add item" form
    let newItemForm = this.props.loading ? <Spinner /> :
      (
        <form
          onSubmit={this.newItemHandler}
          className="items-form">
          {formElements.map( el =>
            <Input
              key={el.id}
              type={el.configuration.type}
              change={(e) => this.onChangeHandler(e, el.id)}
              value={el.configuration.value}
              placeholder={el.configuration.placeholder}
              label={el.configuration.label}
              valid={el.configuration.valid} /> )}

            <Button
              disabled={!this.state.formIsValid}
              btnType="pulse"
              >Save Future Gift </Button>
        </form>
      )

// Create fetched items list
    if (this.props.loadingItems) {
      items = <Spinner />;
    } else if (this.props.items.length > 0) {
        items = (
          <ListItems>
            {this.props.items.map(el =>
              <ListItem
                key={el.id}
                link={el.link}
                name={el.name}
                description={el.description}
                delete={(e) => this.onDeleteItemHandler(e, el.id)} />
            )}
          </ListItems>
        );
    } else {
        items = null;
    }

    return (
      <Fragment>
        <section className="section section--items">
          <h1 className="page-heading">Add new items</h1>
          {error}
          {newItemForm}
          {fetchingError}
          {items}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items,
    error: state.items.error,
    fetchingError: state.items.fetchingError,
    loading: state.items.loading,
    loadingItems: state.items.loadingItems,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddNewItem: (item, token) => dispatch(itemsActions.newItem(item, token)),
    onCheckErrorState: error => dispatch(itemsActions.checkItemsErrorState(error)),
    onFetchItems: userId => dispatch(itemsActions.fetchItems(userId)),
    onDeleteItem: (id, token) => dispatch(itemsActions.deleteItem(id, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);