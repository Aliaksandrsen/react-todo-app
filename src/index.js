import React from 'react';
import ReactDOM from 'react-dom';

import ToDoList from './components/todo-list';
import AppHeader from './components/app-header';
import SearchPannel from './components/search-panal';


const App = () => {

    const todoData = [
        {label: 'Drink Coffee', important: false},
        {label: 'Make Awesome App', important: true},
        {label: 'Have a lunch', important: false},
    ]

    return (
        <div>
            <AppHeader />
            <SearchPannel />
            <ToDoList todos={todoData}/>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
