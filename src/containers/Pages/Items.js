import React, { Fragment, Component } from 'react';
import * as itemsActions from '../../store/actions';
import * as collectionsActions from '../../store/actions';
import { updateObject, checkValidity, setTheme } from '../../shared/utility';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import ListItems from '../../components/ListItems/ListItems';
import ListItem from '../../components/ListItems/ListItem/ListItem';
import ShareSection from '../../components/ShareSection/ShareSection';
import ListCollections from '../../components/ListCollections/ListCollections';

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
    theme: 'default'
  }

  componentDidMount() {
    this.props.onSetInitialState(this.props.error, this.props.items);
    this.checkTheme();

// Fetch items from firebase only when there are none in redux state
    if (!this.props.items.length > 0 && !this.props.collections.length > 0) {
      this.props.onFetchData(this.props.userId, this.props.partEmail);
    } else { return }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading) {
      this.props.onFetchData(this.props.userId, this.props.partEmail);
    }
    if (prevProps.items.length !== this.props.items.length && this.state.editMode) {
      this.checkEditState();
    }
  }

// ADD & DELETE LIST ITEM METHODS //
//////////////////////////////////////////////

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

  onDeleteItemHandler = id => {
    this.props.onDeleteItem(id, this.props.token, this.props.items, this.props.partEmail, this.props.userId);
  }

// EDIT & UPDATE LIST ITEM METHODS //
//////////////////////////////////////////////

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

// THEME CHANGE METHODS //
//////////////////////////////////////////////

  switchTheme = e => {
    const theme = e.target.getAttribute('data-theme');

    if (this.state.theme === 'cyber' && theme === 'cyber') return

    setTheme(theme);
    this.setState({theme: theme})
  }

  checkTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'cyber') {
      setTheme(theme, true);
      this.setState({theme: theme})
    }
  }

  onDeleteCollectionHandler = id => {
    this.props.onDeleteCollection(this.props.partEmail, this.props.userId, this.props.token, id, this.props.collections);
  }

  render() {
    const form = this.state.newItemForm;
    const formElements = [];

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

// CREATE "ADD ITEM" FORM //
//////////////////////////////////////////////

    let submitButton = this.state.theme === 'cyber'
      ? this.state.editMode ? 'Update Item_' : 'Save Future Gift_'
      : this.state.editMode ? 'Update Item' : 'Save Future Gift';

    let newItemForm =
      ( <form
          onSubmit={this.state.editMode
            ? this.updateItemHandler
            : this.newItemHandler}
          className="items-form">
          {this.props.loading
            ? <Spinner />
            : formElements.map( el =>
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
            id="itemSubmit"
            disabled={!this.state.formIsValid}>{submitButton}
            <span className="button_glitch"></span>
            <span className="button_label">W24</span></Button>
        </form> )

// CREATE "FETCHED ITEMS" LIST //
//////////////////////////////////////////////

    let items = null;

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
                    clicked={this.onDeleteItemHandler}>Delete</Button>

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
      }

    return (
      <Fragment>
        <section className="section section--items">
          <h1 className="page-heading">Create your list!</h1>
          {error}
          {newItemForm}
          <ShareSection
            theme = {this.state.theme}
            switchTheme = {this.switchTheme}/>
          {fetchingError}
          <ListCollections />
          {items}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items,
    collections: state.items.collections,
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
    onFetchData: (userId, partEmail) => dispatch(itemsActions.fetchData(userId, null, null, partEmail)),
    onDeleteItem: (id, token, items, partEmail, userId) => dispatch(itemsActions.deleteItem(id, token, items, partEmail, userId)),
    onSetItemEditMode: (id, items) => dispatch(itemsActions.setItemEditMode(id, items)),
    onUpdateItem: (updatedItem, updatedItems, updatedItemId, token, partEmail, userId) => dispatch(itemsActions.updateItem(updatedItem, updatedItems, updatedItemId, token, partEmail, userId)),
    onDeleteCollection: (partEmail, userId, token, id, collections) => dispatch(collectionsActions.deleteCollection(partEmail, userId, token, id, collections))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);