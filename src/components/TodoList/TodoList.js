import React from 'react';
import { connect } from 'react-redux';

import { deleteItem, onToggleImportant, onToggleDone } from '../../store/actions';
import TodoListItem from '../TodoListItem';
import './TodoList.css';


const TodoList = ({ todoData, filter, searchText, deleteItem, onToggleImportant, onToggleDone }) => {
  const searchFunc = (items, term) => {
    const newItems = items.filter((item) => {
      if (item.label.toLowerCase().indexOf(term.toLowerCase()) !== -1) return true;
      return null;
    });
    return newItems;
  };

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
  };

  let newTodoData = searchFunc(todoData, searchText);
  newTodoData = filterFunc(newTodoData, filter);

  const elements = newTodoData.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem {...itemProps}
          deleteItem={() => deleteItem(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    todoData: state.todoData,
    filter: state.filter,
    searchText: state.searchText,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(deleteItem(id)),
    onToggleImportant: (id) => dispatch(onToggleImportant(id)),
    onToggleDone: (id) => dispatch(onToggleDone(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
