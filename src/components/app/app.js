import React, { useState, useCallback, useMemo } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';




const App = () => {

  let maxId = 100;

  const createTodoItem = useCallback((label) => {
    return {
      label: `${label}`, important: false, id: maxId++, done: false,
    };
  }, [maxId]);

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink Coffee'),
    createTodoItem('Make Awesome App'),
    createTodoItem('Have a lunch'),
  ]);
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('all'); // active, all, done


  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const newTodoData = [...todoData].filter((item) => item.id !== id);

      return newTodoData;
    });
  };

  const addItem = (text) => {
    if (text === '') return; // without empty items

    setTodoData((todoData) => {
      const newItem = createTodoItem(`${text}`);
      const newTodoData = [...todoData, newItem];
      return newTodoData;
    });
  };

  const onToggleImportant = (id) => {
    setTodoData((todoData) => {
      const newTodoData = [...todoData];
      newTodoData.map((item) => {
        if (item.id === id) {
          item.important = !item.important;
          return item;
        }
        return item;
      })
      return newTodoData;
    })
  };

  const onToggleDone = (id) => {
    setTodoData((todoData) => {
      const newTodoData = [...todoData];
      newTodoData.map((item) => {
        if (item.id === id) {
          item.done = !item.done;
          return item;
        }
        return item;
      })
      return newTodoData;
    })
  };

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
        onAddItem={addItem} />
    </div>
  );
}

export default App;
