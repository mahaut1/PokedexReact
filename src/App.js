import React, { useState } from 'react';
import './App.css';
import Header from './Header/Header';
import PokemonListPage from './PokemonListPage/PokemonListPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetails from './PokemonDetails/PokemonDetails';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <Router>
      <div>
        <Header selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
        <Routes>
          <Route path="/" element={<PokemonListPage selectedLanguage={selectedLanguage} />} />
          <Route path="/pokemon/:id" element={<PokemonDetails selectedLanguage={selectedLanguage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
