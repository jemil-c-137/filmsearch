import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FILMS_films } from '../pages/__generated__/FILMS';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}


const FilmCard: React.FC<FILMS_films> = ({ title, image, rate, genre, duration, year, slug }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="500" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Rate: {rate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {duration}
        </Typography>
        {genre.map((g) => (
          <span key={g.id}>{g.name} </span>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FilmCard;
