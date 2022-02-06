import { styled } from '@mui/system';

interface FlexItemProps {
  $alignSelf?: 'auto' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'baseline';
  $justifySelf?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | 'left'
    | 'right'
    | 'end'
    | 'start'
    | 'auto';
  $alignItems?: 'center' | 'flex-start' | 'flex-end';
}

export const FlexItem = styled('div')(({ $alignSelf = 'auto', $justifySelf = 'auto' }: FlexItemProps) => ({
  justifySelf: $justifySelf,
  alignSelf: $alignSelf,
}));
