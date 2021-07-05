import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const ItemsAvailable = props => {
  return (
    props.visible
    ? <div className="itemsAvailable">
      <h3 className="itemsAvailable_title">Select items</h3>
        {props.items.map(item => (
          <Fragment key={item.id}>
            <label
              className="itemsAvailable_label"
              htmlFor={item.id}>
              <input
                className="itemsAvailable_checkbox"
                type="checkbox"
                id={item.id}
                value={item.name}/>
              <span className="itemsAvailable_control"/>
              {item.name}</label>
          </Fragment>
        ))}
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