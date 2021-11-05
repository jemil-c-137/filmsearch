import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import { FILMS_films } from '../pages/__generated__/FILMS';
import Chip from '@mui/material/Chip/Chip';
import { styled, Theme } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const ListItem = styled('div')(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(0.5),
  display: 'inline-block',
}));

const FilmCard: React.FC<FILMS_films> = ({ title, image, rate, genre, duration, year, slug }) => {
  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <Link to={`/film/${slug}`} >
        <CardHeader title={title} subheader={year} />
        <CardMedia component="img" height="500" image={image} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Rate: {rate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {duration}
          </Typography>

          {genre.map((g) => (
            <ListItem>
              <Chip key={g.id} label={g.name} color="primary" variant="outlined" />
            </ListItem>
          ))}
        </CardContent>
      </Link>
    </Card>
  );
};

export default FilmCard;
