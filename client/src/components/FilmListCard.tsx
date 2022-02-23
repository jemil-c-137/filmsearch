import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@mui/system/styled';

import { Typography } from '@mui/material';

import { FilmsByGenre_filmsByGenre } from '../interfaces/FilmsByGenre';
import { StyledImage, Flex, FlexItem } from '../elements';
import { durationTransform, yearsTransform } from '../utils/helpers/transforms';
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
  slug,
  duration,
  year,
  tvShow,
  yearEnd,
  rate,
  genres,
}) => {
  const history = useHistory();

  return (
    <Film>
      <Flex
        justify="space-between"
        align="flex-start"
        onClick={() => history.push(`/film/${slug}`)}
        sx={{ cursor: 'pointer' }}>
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
            {`(${yearsTransform(tvShow, year, yearEnd)})`}
          </Typography>
          <Typography>{durationTransform(duration)}</Typography>
          <GenreList genres={genres} size="small" />
        </FlexItem>

        <Typography variant="caption" textAlign="right">
          {rate}
        </Typography>
      </Flex>
    </Film>
  );
};

export default FilmListCard;
