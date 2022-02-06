import { styled } from '@mui/system';

interface FlexProps {
  $direction?: 'column' | 'row' | 'row-reverse' | 'column-reverse';
  $justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  $align?: 'center' | 'flex-start' | 'flex-end';
}

export const Flex = styled('div')(({ $justify = 'center', $direction = 'row', $align = 'center' }: FlexProps) => ({
  display: 'flex',
  justifyContent: $justify,
  flexDirection: $direction,
  alignItems: $align,
}));
