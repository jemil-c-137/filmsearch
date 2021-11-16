import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { borderBottom } from '@mui/system';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { StyledImage } from '../elements/StyledImage';
import {
  Person,
  PersonVariables,
  Person_person_films,
  Person_person_films_film,
  RolesEnum,
} from './__generated__/Person';

const PERSON_QUERY = gql`
  query Person($slug: String!) {
    person(slug: $slug) {
      name
      birthDate
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

  const renderFilms = () => {
    if (!films) return <div>no films</div>;
    const filmsCopy = [...films];

    // sort films by role
    const sortedFilms = filmsCopy.sort((a, b) => (a.role >= b.role ? 1 : -1));
    type f = { role: RolesEnum; films: Person_person_films_film[] }[];

    //since array sorted by roles, no need to search role index, only last role can match with current
    const rolesFilmList = sortedFilms?.reduce((prev: f, current: Person_person_films) => {
      if (prev.length !== 0 && prev[prev.length - 1].role === current.role) {
        const updatedFilms = [...prev[prev.length - 1].films, current.film];

        return [...prev.slice(0, prev.length - 1), { role: current.role, films: updatedFilms }];
      }

      const newFilm = { role: current.role, films: [current.film] };
      return [...prev, newFilm];
    }, []);

    return (
      <>
        {rolesFilmList.map(
          (role) =>
            role.films.length > 0 && (
              <>
                <Box key={role.role} sx={{ padding: '7px 0', borderBottom: '1px solid #999' }}>
                  <Typography color="secondary">{role.role}</Typography>
                </Box>
                {role.films.map((f) => {
                  return (
                    <Typography pl={1} key={f.id}>
                      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/film/${f.slug}`}>
                        {f.title}
                      </Link>
                    </Typography>
                  );
                })}
              </>
            ),
        )}
      </>
    );
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
          <Typography sx={{borderBottom: "1px solid #999", marginBottom: "10px"}} variant="h6" component="h2" color="primary">
            {person.birthDate}
          </Typography>
          <Typography color="secondary" variant="body1">
            Biography
          </Typography>
          <Box sx={{ padding: '15px 10px', borderTop: '1px solid #999', borderBottom: '1px solid #999' }}>
            <Typography>{person.bio}</Typography>
          </Box>
          <>{renderFilms()}</>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PersonPage;
