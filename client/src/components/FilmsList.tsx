import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilmCard from './FilmCard';
import { AllFilms_films_films } from '../interfaces/AllFilms';

interface IFilmsListProps {
  films: AllFilms_films_films[];
}

const FilmsList: React.FC<IFilmsListProps> = ({ films }) => {
  return (
    <Box mt={10} sx={{ flexGrow: 1 }}>
      <Grid container spacing={10} pr={4} pl={4}>
        {films.map((film) => (
          <Grid key={film.slug} item xs={6} md={4}>
            <FilmCard {...film} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilmsList;
