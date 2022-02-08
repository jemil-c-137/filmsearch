import { styled } from '@mui/system';

interface FlexProps {
  $wrap?: 'wrap' | 'nowrap' | 'unset';
  $direction?: 'column' | 'row' | 'row-reverse' | 'column-reverse';
  $justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  $align?: 'center' | 'flex-start' | 'flex-end';
  $colGap?: string;
  $rowGap?: string;
}

export const Flex = styled('div')(
  ({
    $justify = 'center',
    $direction = 'row',
    $align = 'center',
    $wrap = 'nowrap',
    $colGap = 'normal',
    $rowGap = 'normal',
  }: FlexProps) => ({
    display: 'flex',
    justifyContent: $justify,
    flexDirection: $direction,
    alignItems: $align,
    flexWrap: $wrap,
    columnGap: $colGap,
    rowGap: $rowGap,
  }),
);
