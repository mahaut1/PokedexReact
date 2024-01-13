import React, { useState, useEffect } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { Link } from 'react-router-dom';

const PokemonList = ({ selectedLanguage, filteredPokemons}) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://pokedex-jgabriele.vercel.app/types.json").then((response) => response.json()),
      fetch("https://pokedex-jgabriele.vercel.app/pokemons.json").then((response) => response.json())
    ])
    .then(([typesData, pokemonsData]) => {
      setPokemons(pokemonsData || []);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Pokemonitems'>
      {filteredPokemons && filteredPokemons.map((pokemon) => (
        <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
       
            <PokemonCard
              pokemon={pokemon}
              selectedLanguage={selectedLanguage}
            />
         
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
