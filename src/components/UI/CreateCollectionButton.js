import React, { Component } from 'react';

import Button from '../UI/Button';
import { AiFillFolderAdd } from 'react-icons/ai';

class CreateCollectionButton extends Component {
  setCollectionButtonDescription = () => {
    if (this.props.collectionCreated) return 'Created';
    if (this.props.collectionExists) return 'Exists';

    return this.props.collectionFormVisible ? 'Create' : 'Start';
  }

  render() {
    let createButton = document.documentElement.getAttribute('data-theme') === 'cyber'
    ? 'New collection_'
    : 'New collection';

    let createBtnTop = this.props.collectionFormVisible
    ? <input
      className="create_input"
      type="text"
      name="name"
      onChange={this.props.onChange}
      onKeyPress={this.props.onKeyPressed}
      placeholder="My collection"
      value={this.props.value} />
    : <span className="create_description">{createButton}</span>;

    let collectionGlitch = this.props.collectionCreated
    ? <span className="button_glitch"></span>
    : null;

    return (
      <Button
        type="button"
        id="create"
        disabled={this.props.disabled}
        clicked={this.props.collectionFormVisible
          ? null
          : this.props.switchCollectionForm}
        btnType="create">
          {createBtnTop}
          <span
            className="create_action"
            onClick={this.props.onClick}
            >
            {collectionGlitch}
            <AiFillFolderAdd />
            {this.setCollectionButtonDescription()}
            <AiFillFolderAdd />
          </span>
          <span className="button_label">W26</span></Button>
    );
  }
}

export default CreateCollectionButton;