import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import { Link, useHistory } from 'react-router-dom';
import GenreList from './GenreList';
import { Films_films } from '../interfaces/Filmss';

const FilmCard: React.FC<Films_films> = ({ title, image, rate, genres, duration, year, slug, id }) => {

  return (
    <Link
      to={{
        pathname: `/film/${slug}`,
        state: {
          id,
        },
      }}>
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardHeader title={title} subheader={year} />
        <CardMedia component="img" height="500" image={image} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Rate: {rate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {duration}
          </Typography>
          <GenreList genres={genres} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default FilmCard;
