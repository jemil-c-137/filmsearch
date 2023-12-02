import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AddFilmForm from './AddFilmForm';
import { HEADER_HEIGHT } from '../utils/helpers/constants';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ height: HEADER_HEIGHT }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">FilmSearch</Link>
          </Typography>
          <AddFilmForm />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
