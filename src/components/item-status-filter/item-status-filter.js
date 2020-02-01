import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ]

  render() {

    const { filter } = this.props;

    const buttons = this.buttons.map((item) => {
      const isActive = (filter === item.name);
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          key={item.name}
          type="button"
          className={`btn ${clazz}`}
          onClick={() => this.props.onFillterChange(item.name)}>
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
}
