import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import { styled, Theme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import GenreList from './GenreList';
import { FILMS_films } from '../interfaces/FILMS';


const FilmCard: React.FC<FILMS_films> = ({ title, image, rate, genre, duration, year, slug }) => {
  const history = useHistory();

  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined" onClick={() => history.push(`/film/${slug}`)}>
      <CardHeader title={title} subheader={year} />
      <CardMedia component="img" height="500" image={image} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Rate: {rate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {duration}
        </Typography>
        <GenreList genres={genre} />
      </CardContent>
    </Card>
  );
};

export default FilmCard;
