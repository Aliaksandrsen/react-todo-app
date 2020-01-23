import React from 'react';

const SearchPannel = () => {
    const searchText = 'Type here to search';
    const searchStyle = {
        fontSize: '20px'
    }
    return <input
        style={searchStyle}
        placeholder={searchText} />;
}


export default SearchPannel;
