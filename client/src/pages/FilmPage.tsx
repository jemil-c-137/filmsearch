import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const FILM_PAGE = gql`
  query Query($slug: String!) {
  film(slug: $slug) {
    title
  }
}
`

const FilmPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const {loading, error, data} = useQuery(FILM_PAGE, {
    variables: {slug}
  })

  console.log(data)

  console.log(slug);

  return <div>Some film page</div>;
};

export default FilmPage;
