import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import FilmPage from './pages/FilmPage';
import MainPage from './pages/MainPage';
import PageNotFound from './pages/PageNotFound';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PersonPage from './pages/PersonPage';
import FilmsListPage from './pages/FilmsByGenrePage';
import { RIGHT_SIDE_MENU_WIDTH } from './utils/helpers/constants';
import SideMenu from './components/SideMenu';

function App() {
  return (
    <Router>
      <Box>
        <Container style={{ paddingLeft: RIGHT_SIDE_MENU_WIDTH, paddingRight: RIGHT_SIDE_MENU_WIDTH, maxWidth: 1800 }}>
          <Header />

          <main style={{ paddingTop: '5rem' }}>
            <Switch>
              <Route exact path="/">
                <SideMenu />
                <MainPage />
              </Route>
              <Route exact path="/film/:slug">
                <FilmPage />
              </Route>
              <Route exact path="/person/:slug">
                <PersonPage />
              </Route>
              <Route exact path="/genres/:slug">
                <FilmsListPage />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </main>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
