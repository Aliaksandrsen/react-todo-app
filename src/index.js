import React from 'react';
import ReactDOM from 'react-dom';

const ToDoList = () => {
    const items = ['Drink Coffee', 'Build Awesome App'];
    return (
        <ul>
            <li>{items[0]}</li>
            <li>{items[1]}</li>
        </ul>
    );
}

const AppHeader = () => {
    return <h1>My Todo list</h1>;
}

const SearchPannel = () => {
    const searchText = 'Type here to search';
    const searchStyle = {
        fontSize: '20px'
    }
    return <input
        style={searchStyle}
        placeholder={searchText} />;
}

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
