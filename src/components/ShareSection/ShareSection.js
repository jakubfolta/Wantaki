import React, { Component } from 'react';
import * as collectionsActions from '../../store/actions';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';
import { withRouter } from 'react-router';

import Button from '../UI/Button';
import CreateCollectionButton from '../UI/CreateCollectionButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    newCollectionFormIsValid: true,
    collectionExists: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.collections.length > prevProps.collections.length && this.state.collectionFormVisible) {
      this.setState({collectionCreated: true});
      setTimeout(() => {
        this.switchCollectionForm();
        document.getElementById('create').blur();
      }, 2000);
    }
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
    console.log(this.state);

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
        document.querySelector('.createCollectionButton_input').focus();
      }, 500)
    }
  }

  submitCollectionInput = e => {
    console.log('gfdd');
    if (e.key === 'Enter') {
      this.onCreateNewCollectionHandler();
    }
  }

  checkIfCollectionExists = () => {
    let exists = this.props.collections.some(el => el.name === this.state.newCollectionForm.name);

    if (exists) {
      this.setState({collectionExists: true});
      setTimeout(() => {
        this.setState({collectionExists: false});
      }, 1000)
    }

    return exists;
  }

  onCreateNewCollectionHandler = () => {
    if (this.checkIfCollectionExists()) return;

    const collection = {
      name: this.state.newCollectionForm.name,
      timestamp: Date.now()
    };

    this.props.onAddNewCollection(this.props.token, this.props.partEmail, this.props.userId, this.props.collections, collection);
  }

  render() {
    const copyButton = this.props.theme === 'cyber'
    ? 'Your list\'s link_'
    : 'Your list\'s link';

    const [copyGlitch, buttonDescription] = this.state.linkCopied
    ? [<span className="button_glitch"></span>, 'Copied']
    : [null, 'Copy now'];

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
              {buttonDescription}
              <FaArrowLeft />
            </span>
            <span className="button_label">W25</span></Button>

          <CreateCollectionButton
           collectionFormVisible={this.state.collectionFormVisible}
           onChange={this.onChangeHandler}
           onKeyPressed={this.state.newCollectionFormIsValid ? this.submitCollectionInput : null}
           value={this.state.newCollectionForm.name}
           collectionCreated={this.state.collectionCreated}
           disabled={!this.state.newCollectionFormIsValid}
           switchCollectionForm={this.switchCollectionForm}
           onClick={this.state.collectionFormVisible && this.state.newCollectionFormIsValid ? this.onCreateNewCollectionHandler : null}
           collectionExists={this.state.collectionExists}/>

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
  return { onAddNewCollection: (token, partEmail, userId, collections, newCollection) => dispatch(collectionsActions.newCollection(token, partEmail, userId, collections, newCollection)) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShareSection));