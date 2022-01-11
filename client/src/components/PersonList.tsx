import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { FILM_PAGE_film_actors, FILM_PAGE_film_director } from '../interfaces/FILM_PAGE';

const AvatarLabel = styled('div')`
  display: flex;
  align-items: center;
`;

interface IPersonListProps {
  persons: FILM_PAGE_film_actors[] | FILM_PAGE_film_director[];
}

const PersonList: React.FC<IPersonListProps> = ({ persons }) => {
  return (
    <>
      {persons.map((p) => (
        <AvatarLabel key={p.id}>
          <Avatar alt={p.name} src={p.image} style={{ marginRight: '10px' }} />
          <Typography color="teal">
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${p.__typename.toLowerCase()}/${p.slug}`}>
              {p.name}
            </Link>
          </Typography>
        </AvatarLabel>
      ))}
    </>
  );
};

export default PersonList;
