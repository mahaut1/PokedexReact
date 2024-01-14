import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';

const PokemonList = ({ selectedLanguage, filteredPokemons, types, typesData }) => {
  if (!filteredPokemons.length) {
    return <div>No matching Pokemon found.</div>;
  }

  return (
    <div className="Pokemonitems">
      {filteredPokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          selectedLanguage={selectedLanguage}
          types={types}
          typesData={typesData}
        />
      ))}
    </div>
  );
};


export default PokemonList;
