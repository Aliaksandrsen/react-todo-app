import React, { useState } from 'react';
import './item-add-form.css'

const ItemAddForm = ({ onAddItem }) => {

  const [label, setLabel] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem(label);
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
      <button className='btn btn-outline-secondary'>
        Add
      </button>
    </form>
  )
}

export default ItemAddForm;
