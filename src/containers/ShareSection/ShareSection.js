import React, { Component } from 'react';
import * as itemsActions from '../../store/actions';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';
import { withRouter } from 'react-router';

import Button from '../../components/UI/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiFillFolderAdd } from 'react-icons/ai';

class ShareSection extends Component {
  state = {
    newCollectionForm: {
      name: '',
      valid: false,
      rules: {
        required: true,
        minLength: 3
      }
    },
    linkCopied: false,
    collectionCreated: false,
    collectionFormVisible: false,
    newCollectionFormIsValid: true
  }

// Copy link to item's list
  copyLink = () => {
    const baseURL = window.location.href.split(this.props.match.url)[0];

    navigator.clipboard.writeText(baseURL + "/giftideas?user=" + this.props.uuid)
      .then(() => {
      this.setState({linkCopied: true});
      setTimeout(() => {
        this.setState({linkCopied: false});
        document.getElementById('copy').blur();
      }, 3000)
    })
      .catch(error => {
        alert(error);
      })
  }

  onChangeHandler = e => {
    const updatedCollectionForm = updateObject(this.state.newCollectionForm, {
      name: e.target.value,
      valid: checkValidity(e.target.value, this.state.newCollectionForm.rules)
    });

    this.setState({newCollectionForm: updatedCollectionForm, newCollectionFormIsValid: updatedCollectionForm.valid});
  }

  switchCollectionForm = () => {
    if (this.state.collectionFormVisible) {
      const defaultForm = updateObject(this.state.newCollectionForm, {
        name: '',
        valid: false
      });

      this.setState(prevState => {
        return {
          collectionFormVisible: !prevState.collectionFormVisible,
          newCollectionForm: defaultForm,
          collectionCreated: !prevState.collectionCreated
        };
      })
    } else {
      this.setState(prevState => {
        return {
          collectionFormVisible: !prevState.collectionFormVisible,
          newCollectionFormIsValid: !prevState.newCollectionFormIsValid
        };
      })

      setTimeout(() => {
        document.querySelector('.create_input').focus();
      }, 500)
    }
  }

  submitCollectionInput = e => {
    if (e.key === 'Enter') {
      this.onCreateNewCollectionHandler();
    }
  }

  onCreateNewCollectionHandler = () => {
    const collection = {
      name: this.state.newCollectionForm.name,
      timestamp: Date.now()
    };

    this.props.onAddNewCollection(this.props.token, this.props.partEmail, this.props.userId, this.props.collections, collection);
    this.setState({collectionCreated: true});
    setTimeout(() => {
      this.switchCollectionForm();
      document.getElementById('create').blur();
    }, 2000)
  }

  render() {
    let copyButton = this.props.theme === 'cyber'
    ? 'Your list\'s link_'
    : 'Your list\'s link';

    let createButton = this.props.theme === 'cyber'
    ? 'New collection_'
    : 'New collection';

    let createBtnTop = this.state.collectionFormVisible
    ? <input
      className="create_input"
      type="text"
      name="name"
      onChange={this.onChangeHandler}
      onKeyPress={this.state.newCollectionFormIsValid ? this.submitCollectionInput : null}
      placeholder="My collection"
      value={this.state.newCollectionForm.name} />
    : <span className="create_description">{createButton}</span>;

    let copyGlitch = this.state.linkCopied
    ? <span className="button_glitch"></span>
    : null;

    let collectionGlitch = this.state.collectionCreated
    ? <span className="button_glitch"></span>
    : null;

    const shareSection =
      ( <div className="share-section">
          <Button
            type="button"
            id="copy"
            clicked={this.copyLink}
            btnType="copy">
            <span className="copy_description">{copyButton}</span>
            <span className="copy_action">
              {copyGlitch}
              <FaArrowRight />
              {this.state.linkCopied ? 'Copied' : 'Copy now'}
              <FaArrowLeft />
            </span>
            <span className="button_label">W25</span></Button>

          <Button
            type="button"
            id="create"
            disabled={!this.state.newCollectionFormIsValid}
            clicked={this.state.collectionFormVisible
              ? null
              : this.switchCollectionForm}
            btnType="create">
              {createBtnTop}
              <span
                className="create_action"
                onClick={this.state.collectionFormVisible && this.state.newCollectionFormIsValid ? this.onCreateNewCollectionHandler : null}
                >
                {collectionGlitch}
                <AiFillFolderAdd />
                {this.state.collectionCreated
                  ? 'Created'
                  : this.state.collectionFormVisible ? 'Create' : 'Start'
                }
                <AiFillFolderAdd />
              </span>
              <span className="button_label">W26</span></Button>

          <Button
            dataTheme="default"
            clicked={this.props.switchTheme}
          >Theme default</Button>

          <Button
            dataTheme="cyber"
            clicked={this.props.switchTheme}
          >Theme cyber</Button>

          <Button
            dataTheme="materia"
            clicked={this.props.switchTheme}
          >Theme materia</Button>
        </div>
      )

    return shareSection;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    collections: state.items.collections,
    token: state.auth.token,
    userId: state.auth.userId,
    uuid: state.auth.user.uuid,
    partEmail: state.auth.partEmail
  };
}

const mapDispatchToProps = dispatch => {
  return { onAddNewCollection: (token, partEmail, userId, collections, newCollection) => dispatch(itemsActions.newCollection(token, partEmail, userId, collections, newCollection)) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShareSection));