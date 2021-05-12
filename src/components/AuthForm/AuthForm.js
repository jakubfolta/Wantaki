import React, { Fragment } from 'react';

import Button from '../UI/Button';

const AuthForm = props => {
  let emailInput = ['form_login'];
  if (props.emailTouched && props.emailValid) {
    emailInput.push('form_login--valid')
  }
  if (props.emailTouched && !props.emailValid) {
    emailInput.push('form_login--invalid')
  }

  let passwordInput = ['form_password'];
  if (props.passwordTouched && props.passwordValid) {
    passwordInput.push('form_password--valid')
  }
  if (props.passwordTouched && !props.passwordValid) {
    passwordInput.push('form_password--invalid')
  }

  return (
    <Fragment>
      <form
        className="form"
        onSubmit={props.onSubmit}>
        <div className="form_group">
          <input
            className={emailInput.join(' ')}
            type="text"
            id="email"
            placeholder="Email"
            autoComplete="off"
            value={props.emailValue}
            onChange={props.onChange} />
          <label className="form_login-label" htmlFor="email">Email</label>
        </div>
        <div className="form_group">
          <input
            className={passwordInput.join(' ')}
            type="password"
            id="password"
            placeholder="Password"
            value={props.passwordValue}
            onChange={props.onChange} />
          <label className="form_password-label" htmlFor="password">Password</label>
        </div>
        <Button
          type="submit"
          id="authSubmit"
          disabled={props.formIsValid}
          label="W26"  >{props.buttonContent}</Button>
        <Button
          type="button"
          id="switch"
          clicked={props.switch}
          >{!props.signUp ? "Switch to sign up" : "Back to sign in"}
          <span className="button_label">W27</span>
        </Button>
      </form>
    </Fragment>
  );
}

export default AuthForm;