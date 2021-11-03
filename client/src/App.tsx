import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import ActorPage from './pages/ActorPage';
import ActorsPage from './pages/ActorsPage';
import DirectorPage from './pages/DirectorPage';
import DirectorsPage from './pages/DirectorsPage';
import FilmPage from './pages/FilmPage';
import MainPage from './pages/MainPage';
import PageNotFound from './pages/PageNotFound';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
            <Route exact path="/film">
              <FilmPage />
            </Route>
            <Route exact path="/directors">
              <DirectorsPage />
            </Route>
            <Route exact path="/director">
              <DirectorPage />
            </Route>
            <Route exact path="/actors">
              <ActorsPage />
            </Route>
            <Route exact path="/actor">
              <ActorPage />
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
