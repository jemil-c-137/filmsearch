import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { Box, Grid, Typography } from '@mui/material';
import styled from '@mui/system/styled';

import GenreList from '../components/GenreList';
import PersonList from '../components/PersonList';
import { Flex, StyledImage } from '../elements';
import { Film, FilmVariables } from '../interfaces/Film';
import EditFilmForm from '../components/EditFilmForm';
import DeleteDialog from '../components/DeleteDialog';
import { yearsTransform, durationTransform } from '../utils/helpers/transforms';

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

const Bordered = styled('div')`
  border-top: 1px solid #999;
  padding-top: 15px;
`;

const FilmPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { loading, error, data } = useQuery<Film, FilmVariables>(FILM_PAGE_QUERY, {
    variables: { slug },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data || !data.film) return <div>no data available</div>;

  const { film } = data;

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
            {yearsTransform(film.tvShow, film.year, film.yearEnd)}
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
            <Typography variant="caption">{durationTransform(film.duration)}</Typography>
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
          <DeleteDialog slug={film.slug} />
        </Flex>
      </Grid>
    </Grid>
  );
};

export default FilmPage;
