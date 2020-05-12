const deleteItem = (id) => {
  return {
    type: 'ACTION_DELETE_ITEM',
    payload: id,
  };
};

const addItem = (text, maxId) => {
  return {
    type: 'ACTION_ADD_ITEM',
    payload: text,
    maxId,
  };
};

const onToggleImportant = (id) => {
  return {
    type: 'ACTION_ON_TOGGLE_IMPORTANT',
    payload: id,
  };
}

const onToggleDone = (id) => {
  return {
    type: 'ACTION_ON_TOGGLE_DONE',
    payload: id,
  };
}

export {
  deleteItem,
  addItem,
  onToggleImportant,
  onToggleDone,
};