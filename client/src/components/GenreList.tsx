import Chip from '@mui/material/Chip';
import { styled, Theme } from '@mui/material/styles';
import React from 'react';
import { FILMS_films_genre } from '../pages/__generated__/FILMS';
import { FILM_PAGE_film_genre } from '../pages/__generated__/FILM_PAGE';

const ListItem = styled('div')(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(0.5),
  display: 'inline-block',
}));

interface IGenreListProps {
  genres: Array<FILM_PAGE_film_genre | FILMS_films_genre>;
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
