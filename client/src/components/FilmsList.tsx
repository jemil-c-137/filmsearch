import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FilmCard from './FilmCard';
import { FILMS } from '../interfaces/FILMS';

interface IFilmsListProps extends FILMS {}

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
