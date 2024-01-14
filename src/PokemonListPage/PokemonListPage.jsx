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
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [error, setError] = useState(null);

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
    setSelectedPokemon(pokemon);
  };

  const filteredPokemons = rows.filter((pokemon) =>
    pokemon.names[selectedLanguage].toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onPokemonClick={handlePokemonClick}
          />
          {selectedPokemon && (
            <PokemonDetails
              filteredPokemon={selectedPokemon}
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
