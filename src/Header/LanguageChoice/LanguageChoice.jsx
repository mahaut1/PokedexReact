import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function LanguageChoice({ selectedLanguage, onLanguageChange }) {
  const handleLanguageChange = (event) => {
    const language = event.target.value;
    onLanguageChange(language);
  };

  return (
    <div>
      <p id="language">LanguageChoice</p>
      <Select
  label="Language"
  value={selectedLanguage}
  onChange={handleLanguageChange}
  style={{
    minWidth: '80px',
    color: 'white',
    border: '1px solid white', 
    borderRadius: '4px', 
    backgroundColor: 'transparent'
  }}
  IconComponent={() => (
    <div style={{ color: 'white' }}>▼</div>
  )}
>
        <MenuItem value="fr">Fr</MenuItem>
        <MenuItem value="de">De</MenuItem>
        <MenuItem value="en">En</MenuItem>
        <MenuItem value="es">Es</MenuItem>
        <MenuItem value="ja">Ja</MenuItem>
      </Select>
    </div>
  );
}

export default LanguageChoice;
