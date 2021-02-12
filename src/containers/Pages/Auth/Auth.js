import React, { Component, Fragment } from 'react';
import axios from 'axios';

import AuthForm from '../../../components/AuthForm/AuthForm';

class Auth extends Component {
  state = {
    form: {
      email: {
        value: "",
        validity: false,
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        value: "",
        validity: false,
        validation: {
          required: true,
          minLength: 8
        }
      }
    },
    signUp: true,
    validForm: false,
    loading: false,
    token: null,
    userId: null,
    error: ''
  }

  submitHandler = e => {
    e.preventDefault();
    this.setState({loading: true, error: ''})

    const authData = {
      email: this.state.form.email.value,
      password: this.state.form.password.value,
      returnSecureToken: true
    }

    let url = this.state.signUp
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDi3D7k7mvZB32yiGh9J7HWGWVdmw5n2vw'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDi3D7k7mvZB32yiGh9J7HWGWVdmw5n2vw';

    axios.post(url, authData)
      .then( response => {
        const token = response.data.idToken;
        const userId = response.data.localId

        this.setState({loading: false, token: token, userId: userId})
      })
      .catch( err => {
        const errMessage = err.response.data.error.message;

        this.setState({loading: false, error: errMessage})
      })
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
    const updatedForm = {
      ...this.state.form,
      [e.target.id]: {
        ...this.state.form[e.target.id],
        value: e.target.value,
        validity: this.checkValidity(e.target.value, this.state.form[e.target.id].validation)
      }
    };

    let formIsValid = true;
    for (let el in updatedForm) {
      formIsValid = updatedForm[el].validity && formIsValid;
    }

    this.setState({form: updatedForm, validForm: formIsValid})
  }

  render() {
    const form = this.state.form;
    let error = this.state.error ? <div style={{backgroundColor: 'yellow', color: 'red', fontStyle: 'bold'}}>{this.state.error}</div> : null;

    return (
      <Fragment>
        {error}
        <AuthForm
        onSubmit={this.submitHandler}
        emailValue={form.email.value}
        passwordValue={form.password.value}
        onChange={e => this.onChangeHandler(e)}
        switch={this.onSwitchAuthModeHandler}
        signUp={this.state.signUp}
        formIsValid={!this.state.validForm} />
      </Fragment>
    );
  }
}

export default Auth;














