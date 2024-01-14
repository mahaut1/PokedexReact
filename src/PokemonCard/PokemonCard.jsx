import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const PokemonCard = ({ pokemon, selectedLanguage, typesData }) => {
  const { id, name, image, types } = pokemon;

  return (
    <Card className="pokemon-card">
      <Link to={`/pokemon/${id}`} style={{ textDecoration: 'none' }}>
        <CardContent>
          <Typography variant="subtitle1">NO.{id}</Typography>
          <Typography variant="h6">{pokemon.names[selectedLanguage]}</Typography>
          <img src={image} alt={name} />
          <Typography variant="body2"> 
            <div>
              {types.map(type => (
                <Button
                  key={type}
                  className="pokemon-type-button"
                  style={{
                    backgroundColor: typesData && typesData[type]
                      ? typesData[type].backgroundColor
                      : '#FFF',
                    marginRight: 5,
                    marginBottom: 5,
                  }}
                >
                  {typesData && typesData[type]
                    ? typesData[type].translations[selectedLanguage]
                    : type}
                </Button>
              ))}
            </div>
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PokemonCard;
