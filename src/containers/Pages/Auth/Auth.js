import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AuthForm from '../../../components/AuthForm/AuthForm';
import * as authActions from '../../../store/actions';
import { updateObject, checkValidity, setTheme } from '../../../shared/utility';

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
    signUp: false,
    validForm: false,
    theme: 'default'
  }

  componentDidMount() {
    this.props.onCheckErrorState(this.props.error);
    this.checkTheme();
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
    setTimeout(() => {
      document.getElementById("switch").blur();
    }, 1000)
  }

  onChangeHandler = (e) => {
    const updatedFormElement = updateObject(this.state.form[e.target.id], {
      value: e.target.value,
      validity: checkValidity(e.target.value, this.state.form[e.target.id].validation),
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

  checkTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'cyber') {
      setTheme(theme, true);
      this.setState({theme: 'cyber'})
    }
  }

  render() {
    const form = this.state.form;
    let error = this.props.error ? <div className="error">{this.props.error}</div> : null;
    let redirectPath = this.props.isAuthenticated ? <Redirect to='/items'/> : null;

    let submitButton = this.state.theme === 'cyber'
      ? this.state.signUp ? 'Sign up_' : 'Sign in_'
      : this.state.signUp ? 'Sign up' : 'Sign in';

    return (
      <Fragment>
        <section className="section section--auth">
          <h1 className="page-heading page-heading--auth">First step to right gifts</h1>
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
            formIsValid={!this.state.validForm}
            buttonContent={submitButton}  />
        </section>
        {redirectPath}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthHandler: (email, password, type) => dispatch(authActions.auth(email, password, type)),
    onCheckErrorState: (error) => dispatch(authActions.checkAuthErrorState(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);














