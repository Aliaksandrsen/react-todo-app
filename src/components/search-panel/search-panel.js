import React, { useState } from 'react';
import { connect } from 'react-redux';

import { onSearchChange } from '../../store/actions';

import './search-panel.css';


const SearchPanel = ({ onSearchChange }) => {
  const [term, setTerm] = useState('');

  const onChange = (e) => {
    setTerm(e.target.value);
    onSearchChange(e.target.value);
  }

  return (
    <input type="text"
      className="form-control search-input"
      placeholder="type to search"
      value={term}
      onChange={onChange}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (term) => dispatch(onSearchChange(term)),
  }
};

export default connect(null, mapDispatchToProps)(SearchPanel);
