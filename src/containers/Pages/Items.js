import React, { Fragment, Component } from 'react';
import * as itemsActions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';
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
        label: "What you desire ? *",
        valid: false,
        rules: {
          required: true,
          minLength: 6
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
    editMode: false
  }

  componentDidMount() {
    document.getElementById('nameInput').focus();
    this.props.onSetInitialState(this.props.error, this.props.items);

// Fetch items from firebase only when there are none in redux state
    if (!this.props.items.length > 0) {
      this.props.onFetchItems(this.props.userId);
    } else { return }
  }

  componentDidUpdate(prevProps) {
    if (this.state.editMode) {
      const editedItem = document.querySelector('.list_item--edit');
      let initEditMode = true;
      for (let el in this.state.newItemForm) {
        initEditMode = this.state.newItemForm[el].value === '' && initEditMode;
      }
      if (initEditMode) {
        this.resetEditMode();
        this.removeEditClass(editedItem);
      }
    }
    if (prevProps.loading === true) {
    this.props.onFetchItems(this.props.userId);
    }
  }

  resetEditMode = () => {
    this.setState({editMode: false});
    this.props.onSetInitialState(this.props.error, this.props.items);
  }

  newItemHandler = e => {
    e.preventDefault();

    const token = this.props.token;
    const itemData = {
      userId: this.props.userId,
      name: this.state.newItemForm.name.value,
      link: this.state.newItemForm.link.value,
      description: this.state.newItemForm.description.value,
      timestamp: Date.now(),
      editMode: false
    }

    this.props.onAddNewItem(itemData, token);
    this.resetValues();
  }

  updateItemHandler = () => {
    const updatedName = this.state.newItemForm.name.value;
    const updatedLink = this.state.newItemForm.link.value;
    const updatedDescription = this.state.newItemForm.description.value;
    const items = this.props.items;
    const updatedItemIndex = items.findIndex(el => el.editMode === true);
    const updatedItemId = items[updatedItemIndex].id;
    const token = this.props.token;

    const updatedItem = updateObject(items[updatedItemIndex], {
      name: updatedName,
      link: updatedLink,
      description: updatedDescription,
      editMode: false
    });

    const updatedItems = updateObject(items, {
      [items[updatedItemIndex]]: updatedItem
    });

    this.props.onUpdateItem(updatedItems, )

  }

  resetValues = () => {
    const initialName = updateObject(this.state.newItemForm.name, { value: '' });
    const initialLink = updateObject(this.state.newItemForm.link, { value: '' });
    const initialDescription = updateObject(this.state.newItemForm.description, { value: '' });

    const initialInputs = updateObject(this.state.newItemForm, {
      name: initialName,
      link: initialLink,
      description: initialDescription
    });

    this.setState({newItemForm: initialInputs, formIsValid: false});
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

  onDeleteItemHandler = id => {
    this.props.onDeleteItem(id, this.props.token, this.props.items);
    console.log(id);
  }

  onEditItemHandler = (e, id) => {
    document.getElementById('nameInput').focus();
    const item = this.props.items.find(el => el.id === id);
    const DOMitem = e.target.parentNode.parentNode;
    this.setEditClass(DOMitem);

    const updatedName = updateObject(this.state.newItemForm.name, {
       value: item.name});
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
    this.props.onEditItem(id, this.props.items);
  }

  setEditClass = el => {
    const editedItem = document.querySelector('.list_item--edit');
    if (editedItem) {
      this.removeEditClass(editedItem);
    }

    el.classList.add('list_item--edit');
  }

  removeEditClass = el => { el.classList.remove('list_item--edit'); }

  onCancelEditHandler = (e, id) => {
    document.getElementById('nameInput').focus();
    const DOMitem = e.target.parentNode.parentNode;
    this.removeEditClass(DOMitem);

    this.setState(prevState => {
      return {
        formIsValid: false,
        editMode: false
      };
    });
    this.resetValues();
    this.props.onEditItem(id, this.props.items);
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
    let newItemForm = this.props.loading ? <Spinner /> :
      (
        <form
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
              disabled={!this.state.formIsValid}
              btnType="pulse"
              >{this.state.editMode ? 'Update Item' : 'Save Future Gift'}</Button>
        </form>
      )

// Create fetched items list
    if (this.props.loadingItems) {
      items = <Spinner />;
    } else if (this.props.items.length > 0) {
        items = (
          <ListItems>
            {this.props.items.map((el, index) =>
              <ListItem
                key={el.id}
                link={el.link}
                name={el.name}
                description={el.description}>

                <Button
                  btnType="delete"
                  clicked={() => this.onDeleteItemHandler(el.id)}>Delete</Button>
                <Button
                  btnType="edit"
                  clicked={this.props.items[index].editMode
                    ? (e) => this.onCancelEditHandler(e, el.id)
                    : (e) => this.onEditItemHandler(e, el.id)}>
                  {!this.props.items[index].editMode ? 'Edit' : 'Cancel'}</Button>
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
          <h1 className="page-heading">Add new items</h1>
          {error}
          {newItemForm}
          {fetchingError}
          {items}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items,
    error: state.items.error,
    fetchingError: state.items.fetchingError,
    loading: state.items.loading,
    loadingItems: state.items.loadingItems,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddNewItem: (item, token) => dispatch(itemsActions.newItem(item, token)),
    onSetInitialState: (error, items) => dispatch(itemsActions.setInitialState(error, items)),
    onFetchItems: userId => dispatch(itemsActions.fetchItems(userId)),
    onDeleteItem: (id, token, items) => dispatch(itemsActions.deleteItem(id, token, items)),
    onEditItem: (id, items) => dispatch(itemsActions.editItemStart(id, items)),
    onUpdateItem: (items, updatedItemId, token) => dispatch(itemsActions.updateItem(items, updatedItemId, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);