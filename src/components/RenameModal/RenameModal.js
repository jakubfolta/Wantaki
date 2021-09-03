import React, { Fragment } from 'react';
import Button from '../UI/Button';

const RenameModal = props => {
  const renameModal = props.renameBoxVisible
    ? <div className="renameModal">
        <div className="renameModal-box">
          <h3 className="renameModal-title">{props.title}</h3>
          <p className="renameModal-description">{props.description}</p>
          {/* <Fragment> */}
          <Button
            type="button"
            btnType="renameModal-button"
            clicked={props.onConfirmClick}>
            Update
          </Button>
          <Button
            type="button"
            btnType="renameModal-button"
            clicked={props.onAbortClick}>
            Cancel
          </Button>
          {/* </Fragment>} */}
        </div>
      </div>
    : null

  return renameModal;
}

export default RenameModal;