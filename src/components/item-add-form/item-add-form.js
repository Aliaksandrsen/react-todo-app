import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../store/actions';

import './item-add-form.css'


let maxId = 100;

const ItemAddForm = ({ onAddItem }) => {

  const [label, setLabel] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem(label, maxId++);
    setLabel('');
  };

  return (
    <form className='item-add-form d-flex' onSubmit={onSubmit}>
      <input type='text'
        className='form-control'
        onChange={onLabelChange}
        placeholder='What needs to be Done'
        value={label}
      />
      <button className='btn btn-outline-secondary'>Add</button>
    </form>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    onAddItem: (text, maxId) => dispatch(addItem(text, maxId)),
  }
};

export default connect(null, mapDispatchToProps)(ItemAddForm);

