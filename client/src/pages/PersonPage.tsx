import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { StyledImage } from '../elements/StyledImage';
import { Person, PersonVariables, RolesEnum } from './__generated__/Person';

const PERSON_QUERY = gql`
  query Person($slug: String!) {
    person(slug: $slug) {
      name
      age
      image
      bio
      films {
        film {
          title
          slug
        }
        role
      }
    }
  }
`;

const PersonPage = () => {
  const { slug } = useParams<PersonVariables>();
  const { error, data, loading } = useQuery<Person>(PERSON_QUERY, { variables: { slug } });

  if (error) return <div> ...error</div>;
  if (loading) return <div>...loading</div>;
  if (!data || !data.person) return <div> ...no data</div>;

  const { person } = data;
  const { films } = person;

  const directedFilms = films.filter((f) => f?.role === RolesEnum.Director);
  const actedFilms = films.filter((f) => f?.role === RolesEnum.Actor);

  return (
    <Grid container pr={10} pl={10} pt={10}>
      <Grid item xs={6}>
        <StyledImage src={person.image} alt={person.name} />
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="h2" component="h2" color="primary">
            {person.name}
          </Typography>
          <Typography color="secondary" variant="body1">
            Biography
          </Typography>
          <Box sx={{ padding: '15px 10px', borderTop: '1px solid #999', borderBottom: '1px solid #999' }}>
            <Typography>{person.bio}</Typography>
          </Box>
          {actedFilms.length !== 0 && (
            <>
              <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
                <Typography>Actor</Typography>
              </Box>
              {actedFilms.map((f) => {
                return <Typography>{f?.film?.title}</Typography>;
              })}
            </>
          )}
          {directedFilms.length !== 0 && (
            <>
              <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
                <Typography>Director</Typography>
              </Box>
              {directedFilms.map((f) => {
                return <Typography>{f?.film?.title}</Typography>;
              })}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PersonPage;
