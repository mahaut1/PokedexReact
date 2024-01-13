import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon, selectedLanguage }) => {
  const { id, name, image, types } = pokemon;
  
  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${id}`}>
        <p>NO.{id}</p>
        <p>{pokemon.names[selectedLanguage]}</p>
        <img src={image} alt={name} />
        <p>{types.join(', ')}</p>
      </Link>
    </div>
  );
};

export default PokemonCard;
