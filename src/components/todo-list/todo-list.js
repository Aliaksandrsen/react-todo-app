import React from 'react';
import { connect } from 'react-redux';

import { deleteItem, onToggleImportant, onToggleDone } from '../../store/actions';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, deleteItem, onToggleImportant, onToggleDone }) => {

  const elements = todos.map((item) => {
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


const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(deleteItem(id)),
    onToggleImportant: (id) => dispatch(onToggleImportant(id)),
    onToggleDone: (id) => dispatch(onToggleDone(id)),
  }
};

export default connect(null, mapDispatchToProps)(TodoList);

