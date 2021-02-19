import React, { Fragment, Component } from 'react';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import * as itemsActions from '../../store/actions';
import { updateObject } from '../../shared/utility';
import { connect } from 'react-redux';

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
        placeholder: 'Turbo engine V-4x8, Arasaka spoiler, cybernitro, flying module.',
        label: "Additional description",
        valid: true
      }
    },
    formIsValid: false,
    items: []
  }

  newItemHandler = e => {
    e.preventDefault();

    const token = this.props.token;
    const itemData = {
      userId: this.props.userId,
      name: this.state.newItemForm.name.value,
      link: this.state.newItemForm.link.value,
      description: this.state.newItemForm.description.value
    }

    this.props.onAddNewItem(itemData, token);
  }

  checkValidity = (value, rules) => {
    let valid = true;

    if (!rules) {
      return valid;
    }
    if (rules.required) {
      valid = value.trim() !== '' && valid;
    }
    if (rules.minLength) {
      valid = value.trim().length >= rules.minLength && valid;
    }

    return valid;
  }

  onChangeHandler = (e, id) => {
    const updatedElement = updateObject(this.state.newItemForm[id], {
      value: e.target.value,
      valid: this.checkValidity(e.target.value, this.state.newItemForm[id].rules),
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

  render() {
    const form = this.state.newItemForm;
    const formElements = [];

    for (let el in form) {
      formElements.push({
        id: el,
        configuration: form[el]
      })
    }

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


    return (
      <Fragment>
        <section className="section section--items">
          <h1 className="page-heading">Add new items</h1>
          {newItemForm}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.items.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNewItem: (item, token) => dispatch(itemsActions.newItem(item, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);