import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const handleSearchChange = (event) => {
    console.log('Search term:', event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Pokemon..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
