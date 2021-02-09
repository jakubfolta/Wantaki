import React, { Fragment } from 'react';

import Button from '../UI/Button';

const AuthForm = props => {

  return (
    <Fragment>
      <form
        className="form"
        onSubmit={props.onSubmit}>
        <div className="form_group">
          <input
            className="form_login"
            type="text"
            id="email"
            placeholder="Email"
            autoComplete="off"
            value={props.emailValue}
            onChange={props.onChange} />
        </div>
        <div className="form_group">
          <input
            className="form_password"
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