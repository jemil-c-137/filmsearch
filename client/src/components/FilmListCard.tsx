import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@mui/system/styled';

import { Typography } from '@mui/material';

import { FilmsByGenre_filmsByGenre } from '../interfaces/FilmsByGenre';
import { StyledImage, Flex, FlexItem } from '../elements';
import { minutesTransform } from '../utils/helpers/minutesTransform';
import GenreList from './GenreList';

const Film = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
  width: '100%',
});

const Poster = styled('div')({
  maxWidth: '75px',
  rounded: '3px',
});

const FilmListCard: React.FC<FilmsByGenre_filmsByGenre> = ({
  title,
  image,
  id,
  slug,
  duration,
  year,
  tvShow,
  yearEnd,
  rate,
  genres,
}) => {
  return (
    <Film>
      <Link to={`/film/${slug}`} style={{ width: '100%' }}>
        <Flex $justify="space-between" $align="flex-start">
          <FlexItem>
            <Poster>
              <StyledImage src={image} />
            </Poster>
          </FlexItem>
          <FlexItem sx={{ width: '100%', ml: '1rem' }}>
            <Typography sx={{ display: 'inline-block' }} variant="h6">
              {title}
            </Typography>{' '}
            <Typography sx={{ display: 'inline-block' }} variant="subtitle1">
              {tvShow ? `(${year} - ${yearEnd || 'now'})` : `(${year})`}
            </Typography>
            <Typography>{minutesTransform(duration)}</Typography>
            <GenreList genres={genres} size="small" />
          </FlexItem>

          <Typography variant="caption" textAlign="right">
            {rate}
          </Typography>
        </Flex>
      </Link>
    </Film>
  );
};

export default FilmListCard;
