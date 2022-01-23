import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilmCard from './FilmCard';
import { Films } from '../interfaces/Filmss';

interface IFilmsListProps extends Films {}

const FilmsList: React.FC<IFilmsListProps> = ({ films }) => {
  return (
    <Box mt={10} sx={{ flexGrow: 1 }}>
      <Grid container spacing={10} pr={4} pl={4}>
        {films.map((film) => (
          <Grid key={film.id} item xs={6} md={4}>
            <FilmCard {...film} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilmsList;
