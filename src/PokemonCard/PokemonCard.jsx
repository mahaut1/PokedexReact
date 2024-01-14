import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const PokemonCard = ({ pokemon, selectedLanguage, typesData }) => {
  const { id, name, image, types } = pokemon;

  const getBackgroundColor = (type) => {
    const typeInfo = typesData && typesData[type];

    if (typeInfo) {
      return typeInfo.backgroundColor;
    } else {
      return '#FFF';
    }
  };

  return (
    <Card className="pokemon-card">
      <Link to={`/pokemon/${id}`} style={{ textDecoration: 'none' }}>
        <CardContent>
          <Typography variant="subtitle1">NO.{id}</Typography>
          <Typography variant="h6">{pokemon.names[selectedLanguage]}</Typography>
          <img src={image} alt={name} />
          <Typography variant="body2">
            {types.map((type) => (
              <Button
                key={type}
                className="pokemon-type-button"
                style={{
                  backgroundColor: getBackgroundColor(type),
                  color: 'white',
                  marginRight: 3,
                  marginBottom: 3,
                }}
              >
                {typesData[type] && typesData[type].translations[selectedLanguage]
                  ? typesData[type].translations[selectedLanguage]
                  : type}
              </Button>
            ))}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PokemonCard;
