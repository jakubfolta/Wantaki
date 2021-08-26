import React from 'react';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';

const ConfirmationModal = props => {
  const confirmationModal = props.warningBoxVisible
  ? <div className="confirmationModal">
    <div className="confirmationModal-box">
      {props.loadingDelete
        ? <Spinner/>
        : 'ds'}
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
  : null

  return confirmationModal;
}

export default ConfirmationModal;

// {props.warningBoxVisible
//   ? <ConfirmationModal
//       title="!!! Warning !!!"
//       description={confirmationModalDescription}
//       onConfirmClick={props.handleConfirmClick}
//       onAbortClick={props.handleAbortClick}>
//       {props.loadingDelete ? <Spinner/> : null}
//     </ConfirmationModal>
//   : null}