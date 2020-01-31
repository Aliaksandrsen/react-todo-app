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
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id);

      // ! we can not mutate state!!!
      const newTodoData = [...todoData];
      newTodoData.splice(idx, 1);

      //? other way
      // const newArray = [
      //   ...todoData.slice(0, idx),
      //   ...todoData.slice(idx + 1),
      // ]

      return {
        todoData: newTodoData,
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    //! id must be unique
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newItem];

      return {
        todoData: newTodoData,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      // 1. update object
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      // 2. construct new Array
      // ! we can not mutate state!!!
      const newTodoData = [...todoData];
      newTodoData.splice(idx, 1, newItem);

      //? other way
      // const newTodoData = [
      //   ...todoData.slice(0, idx),
      //   newItem,
      //   ...todoData.slice(idx + 1),
      // ]

      return {
        todoData: newTodoData,
      }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      // 1. update object
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, important: !oldItem.important };

      // 2. construct new Array
      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ]
      return {
        todoData: newArray,
      }
    })
  }
  onSearchChange = (term) => {
    this.setState({term});
  }

  search = (items, term) => {
    if (items.lenght === 0) return items;
    return items.filter((item) => {
      return (item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
    });
  }

  render() {

    const { todoData, term } = this.state;

    const visibleItems = this.search(todoData, term);

    const doneCount = todoData.reduce((acc, item) => {
      if (item.done) return acc + 1;
      return acc;
    }, 0);

    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm
          onItemAdded={this.addItem}
        />
      </div>
    );
  };
}
