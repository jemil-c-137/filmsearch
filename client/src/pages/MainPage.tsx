import React from 'react';
import { useQuery, gql } from '@apollo/client';
import FilmsList from '../components/FilmsList';
import AddFilmForm from '../components/AddFilmForm';
import { AllFilms } from '../interfaces/AllFilms';

const ALL_FILMS = gql`
  query AllFilms {
    films {
      title
      tvShow
      yearEnd
      genres {
        name
        id
        slug
      }
      year
      rate
      slug
      duration
      image
    }
  }
`;

const MainPage = () => {
  const { loading, error, data } = useQuery<AllFilms>(ALL_FILMS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div>
      <AddFilmForm />
      {(!data?.films || data.films.length === 0) && <div>No films</div>}
      {data?.films && <FilmsList films={data?.films} />}
    </div>
  );
};

export default MainPage;
