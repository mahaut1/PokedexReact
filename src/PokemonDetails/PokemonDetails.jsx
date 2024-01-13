import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'

const PokemonDetails = ({ filteredPokemon, selectedLanguage, types, pokemons }) => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMovesDialog, setShowMovesDialog] = useState(false);

  useEffect(() => {
    console.log('Fetching pokemons...');
    fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
        .then((response) => response.json())
        .then((data) => {
            console.log('Fetched pokemons successfully:', data);
            const foundPokemon = data.find(p => p.id === parseInt(id));
            setPokemon(foundPokemon);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching Pokemon details:', error);
            setIsLoading(false);
        });
}, [id, selectedLanguage]);

  const handleShowMoves = () => {
    setShowMovesDialog(true);
  };

  const handleCloseMoves = () => {
    setShowMovesDialog(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>Pokemon not found</div>;
  }

  const { name, weight, height, image, moves } = pokemon;

  return (
    <div className="pokemon-card-container">
      <div className="pokemon-card-details">
        <h1>Pokemon Details</h1>
        <img src={image} alt={name} />
        <p>ID: {id}</p>
        <p>Name: {pokemon.names[selectedLanguage]}</p>
        <p>Weight: {weight}</p>
        <p>Height: {height}</p>
        <button onClick={handleShowMoves}>Show Moves</button>

        {showMovesDialog && (
          <div className="moves-dialog">
            <h2>Moves</h2>
            <ul>
              {moves.map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </ul>
            <button onClick={handleCloseMoves}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;
