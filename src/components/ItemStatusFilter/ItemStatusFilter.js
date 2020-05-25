import React from 'react';
import { connect } from 'react-redux';

import { onFilterChange } from '../../store/actions';

import './ItemStatusFilter.css';


const ItemStatusFilter = ({ filter, onFilterChange }) => {
  const buttonsLabels = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  const buttons = buttonsLabels.map((item) => {
    const isActive = (filter === item.name);
    const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
    
    return (
      <button
        key={item.name}
        type="button"
        className={`btn ${clazz}`}
        onClick={() => onFilterChange(item.name)}>
        {item.label}
      </button>
    )
  })

  return (
    <div className="btn-group">
      {buttons}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterChange: (filterName) => dispatch(onFilterChange(filterName)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemStatusFilter);
