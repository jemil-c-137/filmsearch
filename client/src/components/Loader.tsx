import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import React from 'react';
import { Flex } from '../elements';

const Container = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

const Loader = () => {
  return (
    <Container>
      <CircularProgress size="5rem" />
    </Container>
  );
};

export default Loader;
