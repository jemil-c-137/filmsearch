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
import { Button, Pagination } from '@mui/material';

export const ALL_FILMS = gql`
  query AllFilms($sortBy: SortBy!, $filterBy: FilterBy, $page: Int!, $limit: Int!) {
    films(sortBy: $sortBy, filterBy: $filterBy, page: $page, limit: $limit) {
      films {
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
      totalPages
    }
  }
`;

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 4;

  const onPrev = () => setCurrentPage(currentPage - 1);
  const onNext = () => setCurrentPage(currentPage + 1);

  const onChange = (event: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page - 1);

  const {
    queryVariables: { sortBy, filterBy },
  } = useQueriesContext();

  const { loading, error, data } = useQuery<AllFilms, AllFilmsVariables>(ALL_FILMS, {
    variables: { sortBy: { field: sortBy.field, order: sortBy.order }, filterBy, page: currentPage, limit },
  });

  console.log(error, 'error');

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {(!data?.films || data.films === null) && <div>No films</div>}
      {data?.films.films && (
        <React.Fragment>
          <FilmsList films={data?.films.films} />
          <Flex sx={{ marginTop: '3rem' }} justify="space-evenly">
            {/*             <Button disabled={currentPage === 0} onClick={onPrev}>
              prev
            </Button>
            <Button disabled={data?.films.films.length < limit} onClick={onNext}>
              next
            </Button> */}
            {data.films.totalPages !== null && (
              <Pagination page={currentPage + 1} onChange={onChange} count={data.films.totalPages} shape="rounded" />
            )}
          </Flex>
        </React.Fragment>
      )}
    </div>
  );
};

export default MainPage;
