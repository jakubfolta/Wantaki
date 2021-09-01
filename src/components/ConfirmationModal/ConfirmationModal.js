import React, { Fragment } from 'react';
import Button from '../UI/Button';

const ConfirmationModal = props => {
  const confirmationModal = props.warningBoxVisible
  ? <div className="confirmationModal">
      <div className="confirmationModal-box">
        <h3 className="confirmationModal-title">{props.title}</h3>
        <p className="confirmationModal-description">{props.description}</p>
        {props.loading
          ? null
          : <Fragment>
              <Button
                type="button"
                btnType="confirmationModal-button"
                clicked={props.onConfirmClick}>
                Yes
              </Button>
              <Button
                type="button"
                btnType="confirmationModal-button"
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