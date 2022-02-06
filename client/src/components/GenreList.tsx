import Chip from '@mui/material/Chip';
import { styled, Theme } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { AllFilms_films_genres } from '../interfaces/AllFilms';
import { Film_film_genres } from '../interfaces/Film';

const ListItem = styled('div')(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(0.5),
  display: 'inline-block',
  cursor: 'pointer',
}));

interface IGenreListProps {
  genres: Array<Film_film_genres | AllFilms_films_genres>;
  size?: 'small' | 'medium';
}

const GenreList: React.FC<IGenreListProps> = ({ genres, size = 'medium' }) => {
  return (
    <>
      {genres.map((genre) => (
        <ListItem key={genre.id}>
          <Link to={`/genres/${genre.slug}`}>
            <Chip label={genre.name} color="primary" size={size} variant="outlined" style={{ cursor: 'pointer' }} />
          </Link>
        </ListItem>
      ))}
    </>
  );
};

export default GenreList;
