import React, { useState } from 'react';
import { connect } from 'react-redux';

import { deleteItem, addItem, onToggleImportant, onToggleDone } from '../../store/actions';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

let maxId = 100;

const App = ({ todoData, deleteItem, addItem, onToggleImportant, onToggleDone }) => {

  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('all'); // active, all, done

  const onSearchChange = (text) => {
    setTerm(text);
  }

  const onFillterChange = (filter) => {
    setFilter(filter);
  }

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
        <ItemStatusFilter
          onFillterChange={onFillterChange}
          filter={filter}
        />
      </div>
      <TodoList todos={newTodoData}
        onDeleted={deleteItem}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
      />
      <ItemAddForm
        onAddItem={(text) => addItem(text, maxId++)} />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    todoData: state.todoData,
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(deleteItem(id)),
    addItem: (text, maxId) => dispatch(addItem(text, maxId)),
    onToggleImportant: (id) => dispatch(onToggleImportant(id)),
    onToggleDone: (id) => dispatch(onToggleDone(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

