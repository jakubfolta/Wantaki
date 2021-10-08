import React, { Fragment } from 'react';
import Button from '../UI/Button';

const ConfirmationModal = props => {
  const confirmationModal = props.warningBoxVisible
    ? <div className="confirmationModal">
        <div className="confirmationModal_box">
          <h3 className="confirmationModal_title">
            {props.title}
            <span className="button_glitch"></span>
          </h3>
          <p className="confirmationModal_description">{props.description}</p>
          {props.loading
            ? null
            : <Fragment>
                <Button
                  type="button"
                  btnType="confirmationModal_button"
                  clicked={props.onConfirmClick}>
                  Yes
                </Button>
                <Button
                  type="button"
                  btnType="confirmationModal_button"
                  clicked={props.onAbortClick}>
                  No
                </Button>
              </Fragment>}
        </div>
      </div>
    : null

  return confirmationModal;
}

export default ConfirmationModal;