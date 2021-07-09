import React from 'react';
import { connect } from 'react-redux';

import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../UI/Button';

const ItemsAvailable = props => {
  return (
    props.visible
    ? <div className="itemsAvailable">
        <h3 className="itemsAvailable_title">Select items</h3>
        <div className="itemsAvailable_list">
          {props.items.map(item => (
            <label
              key={item.id}
              className="itemsAvailable_label"
              htmlFor={item.id}>
              <input
                className="itemsAvailable_checkbox"
                onClick={props.onCheckedItem}
                type="checkbox"
                id={item.id}
                value={item.name}/>
                <span className="itemsAvailable_control"/>
                {item.name}
            </label>
          ))}

          <Button
            type="button"
            btnType="itemsAvailable_button"
            disabled={!props.itemsChecked}
            clicked={props.clicked} >
            <span className="itemsAvailable_button-icon">
              <AiOutlinePlus />
            </span>
            <span className="button_glitch"></span>
            Add to collection
          </Button>
        </div>
      </div>
    : null
  )
}

const mapStateToProps = state => {
  return {
    items: state.items.items
  }
}

export default connect(mapStateToProps)(ItemsAvailable);