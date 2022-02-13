import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styled from '@mui/system/styled';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

import { FilmsByGenre, FilmsByGenreVariables } from '../interfaces/FilmsByGenre';
import FilmListCard from '../components/FilmListCard';

const QUERY_FILMS_BY_GENRE = gql`
  query FilmsByGenre($slug: String!) {
    filmsByGenre(slug: $slug) {
      title
      rate
      year
      image
      duration
      tvShow
      yearEnd
      slug
      genres {
        id
        name
        slug
      }
    }
  }
`;

export const FilmsByGenrePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { loading, error, data } = useQuery<FilmsByGenre, FilmsByGenreVariables>(QUERY_FILMS_BY_GENRE, {
    variables: { slug },
  });

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data || data.filmsByGenre.length === 0) return <div>No films by this genre</div>;

  const films = data.filmsByGenre;

  return (
    <div>
      <Typography>{`Films in genre`}</Typography>
      <List sx={{ width: '100%', maxWidth: '50rem', bgcolor: 'background.paper' }}>
        {films.map((film) => {
          if (!film) return null;
          return (
            <React.Fragment key={film.slug}>
              <ListItem alignItems="flex-start" style={{ width: '100%' }}>
                <FilmListCard {...film} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};

export default FilmsByGenrePage;
