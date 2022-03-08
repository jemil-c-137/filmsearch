import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './styles/theme';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.REACT_APP_API_URL,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
