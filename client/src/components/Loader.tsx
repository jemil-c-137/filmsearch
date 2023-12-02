import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';


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
