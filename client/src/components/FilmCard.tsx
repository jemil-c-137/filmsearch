import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import GenreList from './GenreList';
import { AllFilms_films } from '../interfaces/AllFilms';
import { yearsTransform, durationTransform } from '../utils/helpers/transforms';

const FilmCard: React.FC<AllFilms_films> = ({ title, image, rate, genres, duration, year, slug, yearEnd, tvShow }) => {
  return (
    <Link to={`/film/${slug}`}>
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardHeader title={title} subheader={yearsTransform(tvShow, year, yearEnd)} />
        <CardMedia component="img" height="500" image={image} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Rate: {rate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {durationTransform(duration)}
          </Typography>
          <GenreList genres={genres} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default FilmCard;
