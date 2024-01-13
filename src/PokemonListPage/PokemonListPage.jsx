import React, { useState, useEffect } from 'react';
import '../PokemonList/PokemonList.css';
import PokemonList from '../PokemonList/PokemonList';
import SearchBar from '../SearchBar/SearchBar';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

const PokemonListPage = ({ selectedLanguage }) => {
    const [allPokemons, setAllPokemons] = useState([]);
  const [rows, setRows] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
      .then((data) => data.json())
      .then((json) => {
        setAllPokemons(json || []);
        setRows(json || []);
        setIsLoadingPokemons(false);
      })
      .catch((error) => {
        console.error("Error fetching pokemon data:", error);
        setIsLoadingPokemons(false);
        setError("Error fetching pokemon data");
      });

    fetch("https://pokedex-jgabriele.vercel.app/types.json")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data[selectedLanguage] || []);
        setIsLoadingTypes(false);
      })
      .catch((error) => {
        console.error("Error fetching types data:", error);
        setIsLoadingTypes(false);
        setError("Error fetching types data");
      });
  }, [selectedLanguage]);

  const filteredPokemons = rows.filter((pokemon) =>
  pokemon.names[selectedLanguage].toLowerCase().includes(searchTerm.toLowerCase())
);

console.log('Filtered Pokemons:', filteredPokemons);

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {error && <p>{error}</p>}
      {(isLoadingPokemons || isLoadingTypes) ? (
        <p>Loading...</p>
      ) : (
        <>
          <PokemonList
            filteredPokemons={filteredPokemons}
            selectedLanguage={selectedLanguage}
            types={types}
          />
          <PokemonDetails
            filteredPokemons={filteredPokemons}
            selectedLanguage={selectedLanguage}
            types={types}
          />
        </>
      )}
    </div>
  );
};

export default PokemonListPage;
