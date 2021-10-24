import React from 'react';
import { useQuery, gql } from '@apollo/client';

const BOOKS_QUERY = gql`
  query {
    books {
      title
      author
    }
  }
`;

const Books = () => {
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      {data.books.map((book) => (
        <li key={book.title}>
          📖 {book.title} - {book.author}
        </li>
      ))}
    </div>
  );
};

export default Books;
