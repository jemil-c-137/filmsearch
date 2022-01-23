import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import FilmPage from './pages/FilmPage';
import MainPage from './pages/MainPage';
import PageNotFound from './pages/PageNotFound';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PersonPage from './pages/PersonPage';

function App() {
  return (
    <Router>
      <Box>
        <Container>
          <Header />
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/film/:slug">
              <FilmPage />
            </Route>
            <Route exact path="/person/:slug">
              <PersonPage />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
