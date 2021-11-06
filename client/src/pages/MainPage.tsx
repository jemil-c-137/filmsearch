import React from 'react';
import { useQuery, gql } from '@apollo/client';
import FilmsList from '../components/FilmsList';
import { FILMS } from './__generated__/FILMS';

const MAIN_PAGE = gql`
  query FILMS {
    films {
      title
      id
      genre {
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
  const { loading, error, data } = useQuery<FILMS>(MAIN_PAGE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data?.films) return <div>No data</div>

  return <div>{data?.films && <FilmsList films={data?.films} />}</div>;
};

export default MainPage;
