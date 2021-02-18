import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import AuthForm from '../../../components/AuthForm/AuthForm';
import * as authActions from '../../../store/actions';
import { updateObject } from '../../../shared/utility';

class Auth extends Component {
  state = {
    form: {
      email: {
        value: "",
        validity: false,
        validation: {
          required: true,
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        validity: false,
        validation: {
          required: true,
          minLength: 8
        },
        touched: false
      }
    },
    signUp: true,
    validForm: false
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuthHandler(this.state.form.email.value, this.state.form.password.value, this.state.signUp);
  }

  onSwitchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        signUp: !prevState.signUp
      };
    })
  }

  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value);
    }

    return isValid
  }

  onChangeHandler = (e) => {
    const updatedFormElement = updateObject(this.state.form[e.target.id], {
      value: e.target.value,
      validity: this.checkValidity(e.target.value, this.state.form[e.target.id].validation),
      touched: true
    });
    const updatedForm = updateObject(this.state.form, {
      [e.target.id]: updatedFormElement
    });

    let formIsValid = true;
    for (let el in updatedForm) {
      formIsValid = updatedForm[el].validity && formIsValid;
    }

    this.setState({form: updatedForm, validForm: formIsValid})
  }

  render() {
    const form = this.state.form;
    let error = this.props.error ? <div style={{backgroundColor: 'yellow', color: 'red', fontStyle: 'bold'}}>{this.props.error}</div> : null;

    return (
      <Fragment>
        <section className="section">
          {error}
          <AuthForm
            onSubmit={this.submitHandler}
            emailValue={form.email.value}
            passwordValue={form.password.value}
            emailValid={form.email.validity}
            passwordValid={form.password.validity}
            onChange={e => this.onChangeHandler(e)}
            emailTouched={form.email.touched}
            passwordTouched={form.password.touched}
            switch={this.onSwitchAuthModeHandler}
            signUp={this.state.signUp}
            formIsValid={!this.state.validForm} />
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthHandler: (email, password, type) => dispatch(authActions.auth(email, password, type))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);














