import React from 'react';
import Button from '../UI/Button';

const ConfirmationModal = props => (
  <div className="confirmationModal">
      <h3 className="confirmationModal-title">{props.title}</h3>
      <p className="confirmationModal-description">{props.description}</p>
      <Button
        type="button"
        btnType="confirmationModal-button"
        // id="copyCollectionLinkButton"
        // clicked={props.handleDeleteClick}
        >
        Yes
      </Button>
      <Button
        type="button"
        btnType="confirmationModal-button"
        // id="copyCollectionLinkButton"
        // clicked={props.handleDeleteClick}
        >
        No
      </Button>
    </div>
)

export default ConfirmationModal;