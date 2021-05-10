import React, { Fragment, Component } from 'react';
import * as itemsActions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import ListItems from '../../components/ListItems/ListItems';
import ListItem from '../../components/ListItems/ListItem/ListItem';

class Items extends Component {
  state = {
    newItemForm: {
      name: {
        type: 'text',
        id: 'nameInput',
        value: '',
        placeholder: 'Quadra Type-66 "Javelina"',
        label: "What you desire ?",
        valid: false,
        rules: {
          required: true,
          minLength: 3
        }
      },
      link: {
        type: 'text',
        value: '',
        placeholder: 'https://www.cybermazon.com',
        label: "Where can you buy it ?",
        valid: true
      },
      description: {
        type: 'textarea',
        value: '',
        placeholder: 'Turbo engine V-4x8, Arasaka spoiler, cybernitro.',
        label: "Additional description",
        valid: true
      }
    },
    formIsValid: false,
    editMode: false,
    linkCopied: false
  }

  componentDidMount() {
    this.props.onSetInitialState(this.props.error, this.props.items);

// Fetch items from firebase only when there are none in redux state
    if (!this.props.items.length > 0) {
      this.props.onFetchItems(this.props.userId, this.props.partEmail);
    } else { return }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading) {
      this.props.onFetchItems(this.props.userId, this.props.partEmail);
    }
    if (prevProps.items.length !== this.props.items.length && this.state.editMode) {
      this.checkEditState();
    }
  }

// Add new item to firebase
  newItemHandler = e => {
    e.preventDefault();

    const token = this.props.token;
    const itemData = {
      userId: this.props.userId,
      name: this.state.newItemForm.name.value,
      link: this.state.newItemForm.link.value,
      description: this.state.newItemForm.description.value,
      timestamp: Date.now(),
      editMode: false,
      uuid: this.props.uuid,
      partEmail: this.props.partEmail
    }

    this.props.onAddNewItem(itemData, token);
    this.resetValues();
  }

// Delete item from firebase and redux state
  onDeleteItemHandler = id => {
    this.props.onDeleteItem(id, this.props.token, this.props.items, this.props.partEmail, this.props.userId);
  }

// Edit & Update list item
  onEditItemHandler = (e, id) => {
    document.getElementById('nameInput').focus();
    const item = this.props.items.find(el => el.id === id);
    const DOMitem = e.target.parentNode.parentNode;
    this.setEditClass(DOMitem);

    const updatedName = updateObject(this.state.newItemForm.name, {
       value: item.name,
       valid: true
     });
    const updatedLink = updateObject(this.state.newItemForm.link, {
       value: item.link});
    const updatedDescription = updateObject(this.state.newItemForm.description, {
       value: item.description});

    const updatedForm = updateObject(this.state.newItemForm, {
      name: updatedName,
      link: updatedLink,
      description: updatedDescription});

    this.setState(prevState => {
      return {
        newItemForm: updatedForm,
        formIsValid: true,
        editMode: true
      };
    });
    this.props.onSetItemEditMode(id, this.props.items);
  }

  checkEditState = () => {
    const editedItem = this.props.items.find(el => el.editMode === true);
    if (editedItem) {
      const DOMitem = document.getElementById(editedItem.id);
      this.setEditClass(DOMitem);
    } else {
      this.resetValues();
    }
  }

  setEditClass = el => {
    const editedItem = document.querySelector('.list_item--edit');
    if (editedItem) {
      this.removeEditClass(editedItem);
    }
    el.classList.add('list_item--edit');
  }

  removeEditClass = el => el.classList.remove('list_item--edit');

  onCancelEditHandler = (e, id) => {
    const DOMitem = e.target.parentNode.parentNode;
    this.removeEditClass(DOMitem);

    this.resetValues();
    this.props.onSetItemEditMode(id, this.props.items);
    DOMitem.childNodes[1].childNodes[1].blur();
  }

  updateItemHandler = e => {
    e.preventDefault();

    const updatedName = this.state.newItemForm.name.value;
    const updatedLink = this.state.newItemForm.link.value;
    const updatedDescription = this.state.newItemForm.description.value;
    const items = [...this.props.items];
    const updatedItemIndex = items.findIndex(el => el.editMode === true);
    const updatedItemId = items[updatedItemIndex].id;

    const updatedItem = updateObject(items[updatedItemIndex], {
      name: updatedName,
      link: updatedLink,
      description: updatedDescription,
      editMode: false
    });

    items.splice(updatedItemIndex, 1, updatedItem);

    this.props.onUpdateItem(updatedItem, items, updatedItemId, this.props.token, this.props.partEmail, this.props.userId);
    this.resetValues();
  }

  resetValues = () => {
    const initialName = updateObject(this.state.newItemForm.name, {
      value: '',
      valid: false
    });
    const initialLink = updateObject(this.state.newItemForm.link, { value: '' });
    const initialDescription = updateObject(this.state.newItemForm.description, { value: '' });

    const initialInputs = updateObject(this.state.newItemForm, {
      name: initialName,
      link: initialLink,
      description: initialDescription
    });

    this.setState({newItemForm: initialInputs, formIsValid: false, editMode: false});
  }

  onChangeHandler = (e, id) => {
    const updatedElement = updateObject(this.state.newItemForm[id], {
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state.newItemForm[id].rules),
    });
    const updatedForm = updateObject(this.state.newItemForm, {
      [id]: updatedElement
    });

    let valid = true;
    for (let el in updatedForm) {
      valid = updatedForm[el].valid && valid;
    }

    this.setState({newItemForm: updatedForm, formIsValid: valid});
  }

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

  switchTheme = () => {
    const el = document.documentElement;
    const buttons = document.querySelectorAll('.button');

    if (el.getAttribute('data-theme') === 'cyber') {
      document.documentElement.removeAttribute('data-theme');
      Array.from(buttons).forEach(el => el.classList.remove("cyber"));
      localStorage.setItem('data-theme', 'default');

    } else {
      document.documentElement.setAttribute('data-theme', 'cyber');
      Array.from(buttons).forEach(el => el.className += " cyber");
      localStorage.setItem('data-theme', 'cyber');
    }
  }

  render() {
    const form = this.state.newItemForm;
    const formElements = [];
    let items;

    let error = this.props.error
      ? <div className="error">{this.props.error}</div>
      : null;
    let fetchingError = this.props.fetchingError
      ? <div className="error">{this.props.fetchingError}</div>
      : null;

    for (let el in form) {
      formElements.push({
        id: el,
        configuration: form[el]
      })
    }

// Create "Add item" form
    let newItemForm = this.props.loading
      ? <Spinner />
      : ( <form
            onSubmit={this.state.editMode
              ? this.updateItemHandler
              : this.newItemHandler}
            className="items-form">
            {formElements.map( el =>
              <Input
                key={el.id}
                type={el.configuration.type}
                focusId={el.configuration.id}
                change={(e) => this.onChangeHandler(e, el.id)}
                value={el.configuration.value}
                placeholder={el.configuration.placeholder}
                label={el.configuration.label}
                valid={el.configuration.valid} /> )}

              <Button
                type="submit"
                disabled={!this.state.formIsValid}
                label="W24" >{this.state.editMode ? 'Update Item_' : 'Save Future Gift_'}</Button>
          </form> )



// Create "share" section
    let shareSection = this.props.items.length > 0
      ? ( <div className="share-section">
            <Button
              clicked={this.switchTheme}

            >{'Change theme'}</Button>
            <Button
              type="button"
              id="copy"
              clicked={this.copyLink}
              btnType="copy"
              >{this.state.linkCopied
                  ? "Copied To Clipboard !!!"
                  : "Copy Link_"}</Button>
          </div> )
      : null

// Create fetched items list
    if (this.props.loadingItems) {
      items = <Spinner />;
    } else if (this.props.items.length > 0) {
        items = (
          <ListItems>
            {this.props.items.map((el, index) =>
              <ListItem
                id={el.id}
                key={el.id}
                name={el.name}
                link={el.link}
                description={el.description}>

                <div className="list_item-group">
                  <Button
                    type="button"
                    btnType="delete"
                    clicked={() => this.onDeleteItemHandler(el.id)}>Delete</Button>
                    <Button
                      type="button"
                      btnType="edit"
                      clicked={this.props.items[index].editMode
                        ? (e) => this.onCancelEditHandler(e, el.id)
                        : (e) => this.onEditItemHandler(e, el.id)}>
                        {!this.props.items[index].editMode ? 'Edit' : 'Cancel'}</Button>

                </div>
              </ListItem>
            )}
          </ListItems>
        );
    } else {
        items = null;
    }

    return (
      <Fragment>
        <section className="section section--items">
          <h1 className="page-heading">Create your list!</h1>
          {error}
          {newItemForm}
          {shareSection}
          {fetchingError}
          {items}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items.items,
    error: state.items.error,
    fetchingError: state.items.fetchingError,
    loading: state.items.loading,
    loadingItems: state.items.loadingItems,
    token: state.auth.token,
    userId: state.auth.userId,
    uuid: state.auth.user.uuid,
    partEmail: state.auth.partEmail
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNewItem: (item, token) => dispatch(itemsActions.newItem(item, token)),
    onSetInitialState: (error, items) => dispatch(itemsActions.setInitialState(error, items)),
    onFetchItems: (userId, partEmail) => dispatch(itemsActions.fetchItems(userId, null, partEmail)),
    onDeleteItem: (id, token, items, partEmail, userId) => dispatch(itemsActions.deleteItem(id, token, items, partEmail, userId)),
    onSetItemEditMode: (id, items) => dispatch(itemsActions.setItemEditMode(id, items)),
    onUpdateItem: (updatedItem, updatedItems, updatedItemId, token, partEmail, userId) => dispatch(itemsActions.updateItem(updatedItem, updatedItems, updatedItemId, token, partEmail, userId))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Items));