import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <TextField
      label="Search Pokemon"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
