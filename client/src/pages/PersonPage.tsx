import React from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import gql from 'graphql-tag';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { StyledImage } from '../elements/StyledImage';
import { Person, PersonVariables, Person_person_acted, Person_person_directed } from '../interfaces/Person';
import { format, differenceInCalendarYears } from 'date-fns';

const PERSON_QUERY = gql`
  query Person($id: ID!) {
    person(id: $id) {
      name
      birthDate
      image
      bio
      acted {
        title
        id
        slug
      }
      directed {
        title
        id
        slug
      }
    }
  }
`;

type PersonFilms = (Person_person_directed | Person_person_acted | null)[];

const PersonPage = () => {
  const {
    state: { id },
  } = useLocation<{ id: string }>();
  const { error, data, loading } = useQuery<Person>(PERSON_QUERY, { variables: { id } });

  if (error) return <div> ...error</div>;
  if (loading) return <div>...loading</div>;
  if (!data || !data.person) return <div> ...no data</div>;

  const { person } = data;

  const { directed, acted } = person;

  const renderFilms = (films: PersonFilms) => {
    return films.map((film) => {
      if (!film) return null;
      return (
        <Typography pl={1} key={film.id}>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={{
              pathname: `/film/${film.slug}`,
              state: {
                id: film.id,
              },
            }}>
            {film.title}
          </Link>
        </Typography>
      );
    });
  };

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
          <Typography
            sx={{ borderBottom: '1px solid #999', marginBottom: '10px' }}
            variant="h6"
            component="h2"
            color="primary">
            {format(new Date(person.birthDate), 'dd MMM yyyy')} (
            {`${differenceInCalendarYears(new Date(), new Date(person.birthDate))} years`})
          </Typography>
          <Typography color="secondary" variant="body1">
            Biography
          </Typography>
          <Box sx={{ padding: '15px 10px', borderTop: '1px solid #999', borderBottom: '1px solid #999' }}>
            <Typography>{person.bio}</Typography>
          </Box>
          <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
            <Typography color="secondary">Directed</Typography>
          </Box>
          {directed.length > 0 ? <React.Fragment>{renderFilms(directed)}</React.Fragment> : <p>No movies</p>}
          <Box sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
            <Typography color="secondary">Acted</Typography>
          </Box>
          {acted.length > 0 ? <React.Fragment>{renderFilms(acted)}</React.Fragment> : <p>No movies</p>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PersonPage;
