import React from 'react';
import { useQuery, gql } from '@apollo/client';
import FilmsList from '../components/FilmsList';
import AddFilmForm from '../components/AddFilmForm';
import { AllFilms } from '../interfaces/AllFilms';

const ALL_FILMS = gql`
  query AllFilms {
    films {
      title
      id
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
  if (!data?.films) return <div>No data</div>;

  return (
    <div>
      <AddFilmForm />
      {data?.films && <FilmsList films={data?.films} />}
    </div>
  );
};

export default MainPage;
