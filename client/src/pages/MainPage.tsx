import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import FilmsList from '../components/FilmsList';
import AddFilmForm from '../components/AddFilmForm';
import { AllFilms, AllFilmsVariables } from '../interfaces/AllFilms';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { SortingField, Order } from '../interfaces/globalTypes';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Flex } from '../elements';
import SideMenu from '../components/SideMenu';
import { useQueriesContext } from '../context/QueriesContext';

export const ALL_FILMS = gql`
  query AllFilms($sortBy: SortBy!, $filterBy: FilterBy) {
    films(sortBy: $sortBy, filterBy: $filterBy) {
      id
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
  const {
    queryVariables: { sortBy, filterBy },
  } = useQueriesContext();

  console.log(filterBy, 'filter by');

  const { loading, error, data } = useQuery<AllFilms, AllFilmsVariables>(ALL_FILMS, {
    variables: { sortBy: { field: sortBy.field, order: sortBy.order }, filterBy },
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {(!data?.films || data.films.length === 0) && <div>No films</div>}
      {data?.films && <FilmsList films={data?.films} />}
    </div>
  );
};

export default MainPage;
