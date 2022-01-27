import Chip from '@mui/material/Chip';
import { styled, Theme } from '@mui/material/styles';
import React from 'react';
import { AllFilms_films_genres } from '../interfaces/AllFilms';
import { Film_film_genres } from '../interfaces/Film';

const ListItem = styled('div')(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(0.5),
  display: 'inline-block',
}));

interface IGenreListProps {
  genres: Array<Film_film_genres | AllFilms_films_genres>;
}

const GenreList: React.FC<IGenreListProps> = ({ genres }) => {
  return (
    <>
      {genres.map((g) => (
        <ListItem key={g.id}>
          <Chip label={g.name} color="primary" variant="outlined" />
        </ListItem>
      ))}
    </>
  );
};

export default GenreList;
