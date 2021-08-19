import React from 'react';
import Button from '../UI/Button';

const ConfirmationModal = props => (
  <div className="confirmationModal">
    <div className="confirmationModal-box">
      <h3 className="confirmationModal-title">{props.title}</h3>
      <p className="confirmationModal-description">{props.description}</p>
      <Button
        type="button"
        btnType="confirmationModal-button"
        clicked={props.onConfirmClick}
        >
        Yes
      </Button>
      <Button
        type="button"
        btnType="confirmationModal-button"
        clicked={props.onAbortClick}
        >
        No
      </Button>
    </div>
  </div>
)

export default ConfirmationModal;