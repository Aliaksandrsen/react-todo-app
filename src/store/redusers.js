const initialState = {
  todoData: [
    { label: 'Drink Coffee', important: false, id: 1, done: false, },
    { label: 'Make Awesome App', important: true, id: 2, done: false, },
  ],
  filter: 'all',
  searchText: '',
};


const rootReduser = (state = initialState, action) => {
  switch (action.type) {

    case 'ACTION_DELETE_ITEM':
      const newTodoDataWithDeleteed = [...state.todoData].filter((item) => item.id !== action.payload);
      return { ...state, todoData: newTodoDataWithDeleteed };

    case 'ACTION_ADD_ITEM':
      if (action.payload === '') return state;

      const newItem = {
        label: `${action.payload}`, important: false, id: action.maxId, done: false,
      };
      const todoDataWithAdded = [...state.todoData, newItem];
      return { ...state, todoData: todoDataWithAdded };

    case 'ACTION_ON_TOGGLE_IMPORTANT':
      const todoDataWithToggleImportant = [...state.todoData];

      todoDataWithToggleImportant.map((item) => {
        if (item.id === action.payload) {
          item.important = !item.important;
          return item;
        }
        return item;
      })
      return { ...state, todoData: todoDataWithToggleImportant };

    case 'ACTION_ON_TOGGLE_DONE':
      const todoDataWithToggleDone = [...state.todoData];

      todoDataWithToggleDone.map((item) => {
        if (item.id === action.payload) {
          item.done = !item.done;
          return item;
        }
        return item;
      })
      return { ...state, todoData: todoDataWithToggleDone };

    case 'ACTION_ON_FILTER_CHANGE':
      return { ...state, filter: action.payload };

    case 'ACTION_ON_SEARCH_CHANGE':
      return { ...state, searchText: action.payload };

    default:
      return state;
  }
}

export { rootReduser };