import React from 'react';
import { connect } from 'react-redux';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


const App = ({ todoData, filter, searchText }) => {

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

  let newTodoData = search(todoData, searchText);
  newTodoData = filterFunc(newTodoData, filter);

  return (
    <div className="todo-app" >
      <AppHeader todoData={todoData} />
      <div className="top-panel d-flex">
        <SearchPanel/>
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
    searchText: state.searchText,
  }
};

export default connect(mapStateToProps)(App);
