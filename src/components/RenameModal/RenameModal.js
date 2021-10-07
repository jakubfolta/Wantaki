import React from 'react';
import Button from '../UI/Button';

const RenameModal = props => {
  const renameModal = props.renameBoxVisible
    ? <div className="renameModal"
           onClick={props.onAbortClick}>
        <div className="renameModal-box">
          <h3 className="renameModal-title">New name</h3>
          <input
            className="renameModal-input"
            id="renameModal"
            type="text"
            name="name"
            onChange={props.handleInputChange}
            onKeyPress={props.handleKeyPress}
            placeholder="My collection"
            value={props.value} />
          <Button
            type="button"
            btnType="renameModal-button"
            clicked={props.onConfirmClick}
            disabled={!props.isValueValid}>
            {props.isNewNameTaken
              ? 'Exists'
              : 'Update'}
          </Button>
          <Button
            type="button"
            btnType="renameModal-button"
            clicked={props.onAbortClick}>
            Cancel
          </Button>
        </div>
      </div>
    : null

  return renameModal;
}

export default RenameModal;