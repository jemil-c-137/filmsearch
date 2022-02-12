import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useQuery, gql, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { Box, Grid, Typography, Button } from '@mui/material';
import styled from '@mui/system/styled';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import GenreList from '../components/GenreList';
import PersonList from '../components/PersonList';
import { Flex, StyledImage, Modal } from '../elements';
import { Film, FilmVariables } from '../interfaces/Film';
import { DeleteFilm, DeleteFilmVariables } from '../interfaces/DeleteFilm';
import EditFilmForm from '../components/EditFilmForm';

const FILM_PAGE_QUERY = gql`
  query Film($slug: String!) {
    film(slug: $slug) {
      title
      year
      description
      rate
      duration
      image
      slug
      genres {
        name
        slug
        id
      }
      director {
        name
        slug
        image
        id
      }
      actors {
        name
        slug
        image
        id
      }
      tvShow
      yearEnd
    }
  }
`;

const DELETE_FILM_MUTATION = gql`
  mutation DeleteFilm($slug: String!) {
    deleteFilm(slug: $slug)
  }
`;

const Bordered = styled('div')`
  border-top: 1px solid #999;
  padding-top: 15px;
`;

const FilmPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const history = useHistory();

  const { loading, error, data } = useQuery<Film, FilmVariables>(FILM_PAGE_QUERY, {
    variables: { slug },
  });

  const [deleteFilm] = useMutation<DeleteFilm, DeleteFilmVariables>(DELETE_FILM_MUTATION);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data || !data.film) return <div>no data available</div>;

  const { film } = data;

  const handleClick = () => {
    deleteFilm({ variables: { slug } }).then((res) => {
      if (res.data?.deleteFilm) {
        history.push('/');
      }
    });
  };

  return (
    <Grid container pr={10} pl={10} pt={10}>
      <Grid item xs={6}>
        <StyledImage src={film.image} alt={film.title} />
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="h2" component="h2" color="primary">
            {film.title}
          </Typography>

          <Typography color="secondary" variant="body1">
            {film.tvShow
              ? `${format(new Date(film.year), 'yyyy')} - ${film.yearEnd || 'now'}`
              : format(new Date(film.year), 'yyyy')}
          </Typography>

          <Bordered>
            <Flex $justify="flex-start">
              <Typography variant="body1">Genres: </Typography>
              <GenreList genres={film.genres} />
            </Flex>
          </Bordered>
          <Flex $justify="flex-start">
            <Typography variant="body1">Rate:</Typography>&nbsp;
            <Typography variant="subtitle2" color="danger">
              {film.rate}
            </Typography>
          </Flex>

          <Flex $justify="flex-start">
            <Typography>Duration:</Typography>&nbsp;
            <Typography variant="caption">{film.duration} min</Typography>
          </Flex>

          <Box sx={{ padding: '15px 10px', borderTop: '1px solid #999', borderBottom: '1px solid #999' }}>
            <Typography>{film.description}</Typography>
          </Box>

          <Typography>Director</Typography>

          <Flex $justify="flex-start" sx={{ my: 2 }}>
            <PersonList persons={[film.director]} />
          </Flex>
          <Bordered />
          <Typography>Actors</Typography>
          <Flex $justify="flex-start" $colGap="1rem" $rowGap=".5rem" $wrap="wrap" sx={{ my: 2 }}>
            <PersonList persons={film.actors} />
          </Flex>
          <Bordered />
        </Box>
        <Flex $justify="space-between" sx={{ py: 2 }}>
          <EditFilmForm film={film} />
          <Button onClick={handleClick} size="small" variant="outlined" startIcon={<DeleteForeverIcon />}>
            Delete film
          </Button>
        </Flex>
      </Grid>
    </Grid>
  );
};

export default FilmPage;
