import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { I_films } from './__generated__/I';


const MAIN_PAGE = gql`
  query I {
    films {
      title
      id
      genre {
        name
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
  const { loading, error, data } = useQuery<I_films>(MAIN_PAGE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return <div>App landing page</div>;
};

export default MainPage;
