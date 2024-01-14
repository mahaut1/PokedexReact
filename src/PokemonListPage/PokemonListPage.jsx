import React, { useState, useEffect } from 'react';
import '../PokemonList/PokemonList.css';
import PokemonList from '../PokemonList/PokemonList';
import SearchBar from '../SearchBar/SearchBar';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const PokemonListPage = ({ selectedLanguage }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [rows, setRows] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(''); 
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [error, setError] = useState(null);
  const [typesData, setTypesData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesResponse, pokemonsResponse] = await Promise.all([
          fetch("https://pokedex-jgabriele.vercel.app/types.json").then(response => response.json()),
          fetch("https://pokedex-jgabriele.vercel.app/pokemons.json").then(response => response.json())
        ]);

        setTypes(typesResponse[selectedLanguage] || []);
        setAllPokemons(pokemonsResponse || []);
        setRows(pokemonsResponse || []);
        setTypesData(typesResponse); 
        setIsLoadingTypes(false);
        setIsLoadingPokemons(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setIsLoadingTypes(false);
        setIsLoadingPokemons(false);
      }
    };
  
    fetchData();
  }, [selectedLanguage]);
  

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon([pokemon]);
  };

  const handleTypeChange = (selectedType) => {
    console.log("Selected Type:", selectedType);
    console.log("Translations Data:", typesData[selectedType]?.translations);
    setSelectedType(selectedType);
  };
  

  const filterPokemonsByType = (pokemons, type) => {
    if (type === '') {
      return pokemons; 
    }

    return pokemons.filter(pokemon => pokemon.types.includes(type));
  };

  const filteredPokemons = filterPokemonsByType(rows, selectedType)
    .filter((pokemon) =>
      pokemon.names && pokemon.names[selectedLanguage] &&
      pokemon.names[selectedLanguage].toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
    <div>
  <Select
    value={selectedType}
    onChange={(e) => handleTypeChange(e.target.value)}
    displayEmpty
    inputProps={{ 'aria-label': 'Type' }}
  >
    <MenuItem value="" >
      All Types
    </MenuItem>
    {Object.keys(typesData).map((type) => (
      <MenuItem key={type} value={type}>
        {typesData[type].translations[selectedLanguage] || type}
      </MenuItem>
    ))}
  </Select>
</div>


      {error && <p>{error}</p>}
      {(isLoadingPokemons || isLoadingTypes) ? (
        <p>Loading...</p>
      ) : (
        <>
          <PokemonList
            filteredPokemons={filteredPokemons}
            selectedLanguage={selectedLanguage}
            types={types}
            typesData={typesData}
            onPokemonClick={handlePokemonClick}
          />
          {selectedPokemon && selectedLanguage && (
            <PokemonDetails
              filteredPokemon={selectedPokemon[0]}   
              selectedLanguage={selectedLanguage}
              types={types}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PokemonListPage;
