import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Button from '../UI/Button';
import { AiFillFolderAdd } from 'react-icons/ai';

class CreateCollectionButton extends Component {
  setCollectionButtonDescription = () => {
    if (this.props.loadingCollections) return 'Creating';
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
      className="createCollectionButton_input"
      type="text"
      name="name"
      onChange={this.props.onChange}
      onKeyPress={this.props.onKeyPressed}
      placeholder="My collection"
      value={this.props.value} />
    : <span className="createCollectionButton_description">{createButton}</span>;

    let collectionGlitch = this.props.collectionCreated
    ? <span className="button_glitch"></span>
    : null;

    return (
      <Fragment>


        <div
          className="createCollectionButton"
          id="create"
          onClick={this.props.collectionFormVisible
            ? null
            : this.props.switchCollectionForm}>
          {createBtnTop}
          <button
            className="createCollectionButton_action"
            onClick={this.props.onClick}
            // disabled={this.props.disabled}
            >
            {collectionGlitch}
            <AiFillFolderAdd />
            {this.setCollectionButtonDescription()}
            <AiFillFolderAdd />
          </button>
          <span className="button_label">W26</span>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingCollections: state.items.loadingCollections
  };
}

export default connect(mapStateToProps)(CreateCollectionButton);