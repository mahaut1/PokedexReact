import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia } from '@mui/material';

const PokemonDetails = ({  selectedLanguage}) => {
  console.log('Selected Language in PokemonDetails:', selectedLanguage);
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMovesDialog, setShowMovesDialog] = useState(false);
  const [typesData, setTypesData] = useState(null);

  useEffect(() => {
    fetch("https://pokedex-jgabriele.vercel.app/types.json")
      .then((response) => response.json())
      .then((data) => {
        setTypesData(data);
      })
      .catch((error) => {
        console.error("Error fetching types data:", error);
      });
  }, []);

  useEffect(() => {
    console.log('Selected Language:', selectedLanguage);
    console.log('Fetching pokemons...');
    fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched pokemons successfully:', data);
        console.log('Pokemon Data:', data);
        const foundPokemon = data.find(p => p.id === parseInt(id));
        if (foundPokemon) {
          console.log('Found Pokemon:', foundPokemon);
          setPokemon(foundPokemon);
          setIsLoading(false);
        } else {
          console.error('Pokemon not found');
          setIsLoading(false);
        }
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

  const { name, weight, height, image, moves, types: pokemonTypes, names } = pokemon;
  const translatedTypes = pokemonTypes && pokemonTypes.map(type => {
    const typeInfo = typesData[type];
  
    if (typeInfo) {
      const translatedName = typeInfo.translations[selectedLanguage];
      const displayType = translatedName || type;
  
      return (
        <Button
          key={type}
          variant="contained"
          style={{
            backgroundColor: typeInfo.backgroundColor || '#FFF',
            marginRight: 5,
            marginBottom: 5,
            color: 'white',
          }}
        >
          {displayType}
        </Button>
      );
    }
  
    return null;
  });
  
  console.log('Names:', names);
console.log('Selected Language:', selectedLanguage);
console.log("TypeData", typesData)
  return (
    <Card className="pokemon-card-container">
      <CardContent className="pokemon-card-details">
      <Typography variant="h4" component="div">
        {names && names[selectedLanguage]}
      </Typography>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <Typography>ID: {id}</Typography>
        <Typography>Weight: {weight} kg</Typography>
        <Typography>Height: {height} m</Typography>
        <div>
          <Typography>Types:</Typography>
          {translatedTypes}
        </div>
        <Button variant="contained" onClick={handleShowMoves}>Show Moves</Button>

        <Dialog open={showMovesDialog} onClose={handleCloseMoves}>
          <DialogTitle>Moves</DialogTitle>
          <DialogContent>
            <ul>
              {moves.map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMoves}>Close</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PokemonDetails;
