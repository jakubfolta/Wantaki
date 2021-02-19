import React, { Fragment, Component } from 'react';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { updateObject } from '../../shared/utility';

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

    const newItemForm = (
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
            >Save Future Gift </Button>
      </form>
    );

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

export default Items;