import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { StyledImage } from '../elements/StyledImage';
import { Person, PersonVariables, Person_person_films_film, RolesEnum } from './__generated__/Person';

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
          id
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

  const filtered = films?.reduce((prev, current) => {
    if (prev[current.role]) {
      return { ...prev, [current.role]: [...prev[current.role], current.film] };
    }
    return { ...prev, [current.role]: [current?.film] };
  }, {} as Record<RolesEnum, Person_person_films_film[]>);

  console.log(filtered);

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
          {filtered?.Actor?.length !== 0 && (
            <>
              <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
                <Typography>Actor</Typography>
              </Box>
              {filtered?.Actor?.map((f) => {
                return <Typography key={f.id}>{f.title}</Typography>;
              })}
            </>
          )}
          {filtered?.Director?.length !== 0 && (
            <>
              <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
                <Typography>Director</Typography>
              </Box>
              {filtered?.Director?.map((f) => {
                return <Typography id={f.id}>{f.title}</Typography>;
              })}
            </>
          )}
          {filtered?.Operator?.length !== 0 && (
            <>
              <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
                <Typography>Operator</Typography>
              </Box>
              {filtered?.Operator?.map((f) => {
                return <Typography id={f.id}>{f.title}</Typography>;
              })}
            </>
          )}
          {filtered?.Screenwriter?.length !== 0 && (
            <>
              <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
                <Typography>Screenwriter</Typography>
              </Box>
              {filtered?.Screenwriter?.map((f) => {
                return <Typography id={f.id}>{f.title}</Typography>;
              })}
            </>
          )}
          {filtered?.Producer?.length !== 0 && (
            <>
              <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
                <Typography>Producer</Typography>
              </Box>
              {filtered?.Producer?.map((f) => {
                return <Typography id={f.id}>{f.title}</Typography>;
              })}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PersonPage;
