import React from 'react';
import './app-header.css';

const AppHeader = ({todoData}) => {

  const done = todoData.reduce((acc, item) => {
    if (item.done) acc++;
    return acc;
  }, 0);
  
  const toDo = todoData.length - done;

  return (
    <div className="app-header d-flex">
      <h1>Todo List</h1>
      <h2>{toDo} more to do, {done} done</h2>
    </div>
  );
};

export default AppHeader;
