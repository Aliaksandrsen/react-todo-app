import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import ItemAddForm from '../item-add-form';

import './app.css';


export default class App extends Component {
  // id for item in array
  maxId = 100;

  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 },
    ],
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      // search for id
      // ! we can not mutate state!!!
      const newTodoData = [...todoData];

      const idx = newTodoData.findIndex((el) => el.id === id);
      // cut this item from todo-list
      newTodoData.splice(idx, 1);
      return {
        // return new state
        todoData: newTodoData,
      }
    });
  };

  addItem = (text) => {
    const newItem = { label: `${text}`, important: false, id: this.maxId++ };
    //! id must be unique
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData];
      newTodoData.push(newItem);
      return {
        todoData: newTodoData,
      };
    });
  };

  render() {
    return (
      <div className="todo-app" >
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={this.state.todoData}
          onDeleted={this.deleteItem}
        />
        <ItemAddForm
          onItemAdded={this.addItem}
        />
      </div>
    );
  };
}
