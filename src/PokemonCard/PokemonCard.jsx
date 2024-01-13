import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PokemonCard = ({ pokemon, selectedLanguage }) => {
  const { id, name, image, types } = pokemon;

  return (
    <Card className="pokemon-card">
      <Link to={`/pokemon/${id}`} style={{ textDecoration: 'none' }}>
        <CardContent>
          <Typography variant="subtitle1">NO.{id}</Typography>
          <Typography variant="h6">{pokemon.names[selectedLanguage]}</Typography>
          <img src={image} alt={name} />
          <Typography variant="body2"> {types.join(', ')}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PokemonCard;
