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
  query AllFilms($sortBy: SortBy!) {
    films(sortBy: $sortBy) {
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
  /* const [sortBy, setSortBy] = useState<SortingField>(SortingField.title);

  const handleChange = (event: SelectChangeEvent<SortingField>) => {
    setSortBy(event.target.value as SortingField);
  }; */
  const {
    queryVariables: { sortBy },
  } = useQueriesContext();

  const { loading, error, data } = useQuery<AllFilms, AllFilmsVariables>(ALL_FILMS, {
    variables: { sortBy: { field: sortBy.field, order: sortBy.order } },
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      <div>
        <Flex colgap="10px" justify="flex-end">
          {/*  <h2>All films sorted by</h2>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            label="Age"
            onChange={handleChange}>
            {Object.keys(SortingField).map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select> */}
        </Flex>
      </div>
      {(!data?.films || data.films.length === 0) && <div>No films</div>}
      {data?.films && <FilmsList films={data?.films} />}
    </div>
  );
};

export default MainPage;
