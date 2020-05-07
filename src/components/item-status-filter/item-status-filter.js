import React from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({ filter, onFillterChange }) => {

  const buttonsLabels = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ]

  const buttons = buttonsLabels.map((item) => {
    const isActive = (filter === item.name);
    const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
    
    return (
      <button
        key={item.name}
        type="button"
        className={`btn ${clazz}`}
        onClick={() => onFillterChange(item.name)}>
        {item.label}
      </button>
    )
  })

  return (
    <div className="btn-group">
      {buttons}
    </div>
  );

}

export default ItemStatusFilter;