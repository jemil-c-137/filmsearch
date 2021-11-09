import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { FILM_PAGEVariables, FILM_PAGE } from './__generated__/FILM_PAGE';
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import styled from '@mui/system/styled';
import GenreList from '../components/GenreList';
import PersonList from '../components/PersonList';
import { StyledImage } from '../elements/StyledImage';


const FILM_PAGE_QUERY = gql`
  query FILM_PAGE($slug: String!) {
    film(slug: $slug) {
      title
      year
      description
      rate
      duration
      image
      genre {
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

const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Rate = styled(Typography)`
  border-radius: 50%;
  background: green;
  display: inline;
  padding: 3px;
`;

const FilmPage = () => {
  const { slug } = useParams<FILM_PAGEVariables>();
  const { loading, error, data } = useQuery<FILM_PAGE>(FILM_PAGE_QUERY, {
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
            {film.tvShow ? `${film.year} - ${film.yearEnd || 'now'}` : film.year}
          </Typography>

          <Bordered>
            <FlexBox sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">Genres: </Typography>
              <GenreList genres={film.genre} />
            </FlexBox>
          </Bordered>
          <FlexBox>
            <Typography variant="body1">Rate:</Typography>&nbsp;
            <Typography variant="subtitle2" color="danger">
              {film.rate}
            </Typography>
          </FlexBox>

          <FlexBox>
            <Typography>Duration:</Typography>&nbsp;
            <Typography variant="caption">{film.duration} min</Typography>
          </FlexBox>

          <Box sx={{ padding: '15px 10px', borderTop: '1px solid #999', borderBottom: '1px solid #999' }}>
            <Typography>{film.description}</Typography>
          </Box>

          <FlexBox mt={2}>
            <Typography>Director: </Typography>&nbsp; <PersonList persons={[film.director]} />
          </FlexBox>

          <FlexBox mt={2}>
            <Typography>Actors: </Typography>&nbsp; <PersonList persons={film.actors} />
          </FlexBox>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FilmPage;
