import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { Film_film_actors, Film_film_director } from '../interfaces/Film';

const AvatarLabel = styled('div')`
  display: flex;
  align-items: center;
`;

interface IPersonListProps {
  persons: Film_film_actors[] | Film_film_director[];
}

const PersonList: React.FC<IPersonListProps> = ({ persons }) => {
  return (
    <>
      {persons.map((p) => (
        <AvatarLabel key={p.id}>
          <Avatar alt={p.name} src={p.image} style={{ marginRight: '10px' }} />
          <Typography color="teal">
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/person/${p.slug}`}>
              {p.name}
            </Link>
          </Typography>
        </AvatarLabel>
      ))}
    </>
  );
};

export default PersonList;
