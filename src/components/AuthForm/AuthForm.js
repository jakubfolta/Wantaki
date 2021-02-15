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
        </div>
        <div className="form_group">
          <input
            className={passwordInput.join(' ')}
            type="password"
            id="password"
            placeholder="Password"
            value={props.passwordValue}
            onChange={props.onChange} />
        </div>
        <Button
          disabled={props.formIsValid}>{props.signUp ? "Sign Up" : "Sign In"}</Button>
      </form>
      <Button
        clicked={props.switch}>Switch to {!props.signUp ? "Sign Up" : "Sign In"}</Button>
    </Fragment>
  );
}

export default AuthForm;