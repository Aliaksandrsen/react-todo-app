import React, { useState } from 'react';
import { connect } from 'react-redux';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


const App = ({ todoData, filter }) => {

  const [term, setTerm] = useState('');

  const onSearchChange = (text) => {
    setTerm(text);
  };

  const search = (items, term) => {
    const newItems = items.filter((item) => {
      if (item.label.toLowerCase().indexOf(term.toLowerCase()) !== -1) return true;
      return null;
    });

    return newItems;
  }

  const filterFunc = (items, filter) => {
    let newItems;

    if (filter === 'active') {
      newItems = items.filter((item) => {
        if (!item.done) return true;
        return false;
      });
      return newItems;
    }

    if (filter === 'done') {
      newItems = items.filter((item) => {
        if (item.done) return true;
        return false;
      });
      return newItems;
    }

    return items;
  }

  let newTodoData = search(todoData, term);
  newTodoData = filterFunc(newTodoData, filter);

  const done = todoData.reduce((acc, item) => {
    if (item.done) acc++;
    return acc;
  }, 0);
  const toDo = todoData.length - done;

  return (
    <div className="todo-app" >
      <AppHeader toDo={toDo} done={done} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter/>
      </div>
      <TodoList todos={newTodoData}/>
      <ItemAddForm />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todoData: state.todoData,
    filter: state.filter,
  }
};

export default connect(mapStateToProps)(App);
