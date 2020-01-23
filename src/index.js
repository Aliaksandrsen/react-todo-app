import React from 'react';
import ReactDOM from 'react-dom';

import ToDoList from './components/todo-list';
import AppHeader from './components/app-header';
import SearchPannel from './components/search-panal';


const App = () => {

    return (
        <div>
            <AppHeader />
            <SearchPannel />
            <ToDoList />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
