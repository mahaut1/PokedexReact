import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';

const PokemonDetails = ({ filteredPokemon, selectedLanguage, types, pokemons }) => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMovesDialog, setShowMovesDialog] = useState(false);
  const [typesData, setTypesData] = useState(null);

  useEffect(() => {
    // Fetch pour récupérer les données de traduction des types
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
    console.log('Fetching pokemons...');
    fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched pokemons successfully:', data);
        console.log('Pokemon Data:', data);
        const foundPokemon = data.find(p => p.id === parseInt(id));
        if (foundPokemon) {
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

  const { name, weight, height, image, moves } = pokemon;

  const translatedTypes = types && types.map(type => (
    <Chip
      key={type}
      label={typesData && typesData[type] ? typesData[type].translations[selectedLanguage] : type}
      style={{ backgroundColor: typesData && typesData[type] ? typesData[type].backgroundColor : '#000', marginRight: 5 }}
    />
  ));

  return (
    <Card className="pokemon-card-container">
      <CardContent className="pokemon-card-details">
        <Typography variant="h4" component="div">Pokemon Details</Typography>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <Typography>ID: {id}</Typography>
        <Typography>Name: {pokemon.names[selectedLanguage]}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography>Height: {height}</Typography>
        {/* Afficher les types traduits en utilisant les Chips */}
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
