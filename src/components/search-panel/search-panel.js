import React, { useState } from 'react';

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

export default SearchPanel;