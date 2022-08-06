import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState, useRef } from 'react';
import { HEADER_HEIGHT, RIGHT_SIDE_MENU_WIDTH } from '../utils/helpers/constants';
import { SortingField, Order, SortBy } from '../interfaces/globalTypes';
import { Flex } from '../elements';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import useOnClickOutside from '../utils/hooks/useOutsideClick';
import { useQuery, gql } from '@apollo/client';
import { useQueriesContext } from '../context/QueriesContext';
import { SideMenuQuery } from '../interfaces/SideMenuQuery';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Slider from '@mui/material/Slider';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

import Box from '@mui/material/Box';

type TFilterFields = 'directros' | 'genres' | 'year' | 'rate';

const Container = styled('div')`
  width: 120px;
  position: relative;
`;

const Select = styled('div')`
  cursor: pointer;
  padding: 4px 0;
  border: #ccc 1px solid;
  border-radius: 8px;
  width: 100%;
`;

const Options = styled('div')`
  background: #fff;
  border: #ccc 1px solid;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: absolute;
  top: 34px;
  z-index: 10;
  width: 100%;
`;

const Option = styled('div')`
  &:hover {
    background: #ccc;
    cursor: pointer;
  }
`;

const SIDE_MENU_QUERY = gql`
  query SideMenuQuery {
    genres {
      slug
      name
      id
    }
    directors {
      slug
      name
      id
      image
    }
  }
`;

const SideMenu = () => {
  const minDistance = 1;
  const currentYear = new Date().getFullYear();

  const [sortBy, setSortBy] = useState<SortBy>({ field: SortingField.title, order: Order.ASC });
  const [show, setShow] = useState(false);

  const [expandedFields, setExpandedFields] = useState<TFilterFields[]>([]);
  const [checkedGenres, setCheckedGenres] = useState<string[]>([]);
  const [checkedDirectors, setCheckedDirectors] = useState<string[]>([]);
  const [year, setYear] = useState<[number, number]>([1920, currentYear]);
  const [rate, setRate] = useState<[number, number]>([1, 10]);

  const ref = useRef<HTMLDivElement>(null);

  const { updateQueryVariables } = useQueriesContext();

  const sorting = Object.keys(SortingField).reduce((prev, current) => {
    return [
      ...prev,
      { field: current as SortingField, order: Order.ASC },
      { field: current as SortingField, order: Order.DESC },
    ];
  }, [] as { field: SortingField; order: Order }[]);

  useOnClickOutside(ref, () => setShow(false));

  const { loading, error, data } = useQuery<SideMenuQuery>(SIDE_MENU_QUERY);

  const handleClick = (field: TFilterFields) => {
    if (expandedFields.includes(field)) {
      setExpandedFields((prevState) => prevState.filter((existingField) => existingField !== field));
    } else {
      setExpandedFields((prevState) => [...prevState, field]);
    }
  };

  const onSortByChange = (sortBy: SortBy) => {
    setSortBy(sortBy);
    updateQueryVariables({ sortBy });
    setShow(false);
  };

  const renderOption = (sortBy: SortBy) => (
    <Flex>
      <div>{sortBy.field}</div>
      {sortBy.order === Order.ASC ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
    </Flex>
  );

  const onGenreClick = (value: string) => {
    const currentIndex = checkedGenres.indexOf(value);
    const newChecked = [...checkedGenres];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedGenres(newChecked);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const onDirectorClick = (value: string) => {
    const currentIndex = checkedDirectors.indexOf(value);
    const newChecked = [...checkedDirectors];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedDirectors(newChecked);
  };

  const changeRange = (
    range: [number, number],
    setRange: (range: [number, number]) => void,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRange([Math.min(newValue[0], range[1] - minDistance), range[1]]);
    } else {
      setRange([range[0], Math.max(newValue[1], range[0] + minDistance)]);
    }
  };

  const handleYearChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    changeRange(year, setYear, newValue, activeThumb);
  };

  const handleRateChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    changeRange(rate, setRate, newValue, activeThumb);
  };

  const applyFilters = () => {
    const yearRange = {
      min: year[0],
      max: year[1],
    };
    const rateRange = {
      min: rate[0],
      max: rate[1],
    };
    updateQueryVariables({
      filterBy: {
        ...(checkedGenres.length > 0 && { genres: checkedGenres }),
        ...(checkedDirectors.length > 0 && { directors: checkedDirectors }),
        year: yearRange,
        rate: rateRange,
      },
      sortBy,
    });
  };

  console.log(year, 'year');

  return (
    <Drawer
      sx={{
        width: RIGHT_SIDE_MENU_WIDTH,

        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: RIGHT_SIDE_MENU_WIDTH,
          boxSizing: 'border-box',
          marginTop: HEADER_HEIGHT,
          zIndex: 1000,
          paddingBottom: HEADER_HEIGHT,
          overflowY: 'scroll',
        },
      }}
      variant="permanent"
      anchor="left">
      <Divider />
      <List>
        <Flex direction="column">
          <Typography variant="subtitle1" gutterBottom component="div">
            Sort by:
          </Typography>
          <Container ref={ref}>
            <Select onClick={(e) => setShow(!show)}>{renderOption(sortBy)}</Select>

            {show && (
              <Options>
                {sorting.map((item) => (
                  <Option
                    key={item.field + item.order}
                    onClick={() => onSortByChange({ field: item.field, order: item.order })}>
                    {renderOption(item)}
                  </Option>
                ))}
              </Options>
            )}
          </Container>
        </Flex>
      </List>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <Flex direction="column">
          <Typography variant="subtitle1" gutterBottom component="div">
            Filter by:
          </Typography>
          <ListItemButton onClick={() => handleClick('genres')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Genre" />
            {expandedFields.includes('genres') ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandedFields.includes('genres')} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {data?.genres.map((genre) => (
                <Chip
                  onClick={() => onGenreClick(genre.id)}
                  color={checkedGenres.includes(genre.id) ? 'primary' : 'default'}
                  key={genre.slug}
                  label={genre.name}
                  sx={{ m: '5px' }}
                  size="medium"
                />
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => handleClick('directros')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Directors" />
            {expandedFields.includes('directros') ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandedFields.includes('directros')} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {data?.directors.map((director) => {
                if (!director) {
                  return null;
                } else
                  return (
                    <Chip
                      onClick={() => onDirectorClick(director.id)}
                      avatar={<Avatar alt={director.name} src={director.image} />}
                      color={checkedDirectors.includes(director.id) ? 'primary' : 'default'}
                      key={director.slug}
                      label={director.name}
                      sx={{ m: '5px' }}
                      size="medium"
                      variant="outlined"
                    />
                  );
              })}
            </List>
          </Collapse>
          <ListItemButton onClick={() => handleClick('year')}>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Year" />
            {expandedFields.includes('year') ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandedFields.includes('year')} timeout="auto" unmountOnExit>
            <Box sx={{ width: 100 }}>
              <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={year}
                onChange={handleYearChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                disableSwap
                min={1920}
                max={currentYear}
                sx={{
                  marginTop: '30px',
                  marginBottom: '50px',
                  '& .MuiSlider-thumb[data-index="0"] .MuiSlider-valueLabel': {
                    background: '#556cd6',
                    top: '60px',
                  },
                  '& .MuiSlider-thumb[data-index="0"] .MuiSlider-valueLabel:before': {
                    transform: 'translate(-50%, -300%) rotate(45deg)',
                  },
                }}
              />
            </Box>
          </Collapse>
          <ListItemButton onClick={() => handleClick('rate')}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Rate" />
            {expandedFields.includes('rate') ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandedFields.includes('rate')} timeout="auto" unmountOnExit>
            <Box sx={{ width: 100 }}>
              <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={rate}
                onChange={handleRateChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                disableSwap
                min={1}
                max={10}
                sx={{
                  marginTop: '30px',
                  marginBottom: '50px',
                  '& .MuiSlider-thumb[data-index="0"] .MuiSlider-valueLabel': {
                    background: '#556cd6',
                    top: '60px',
                  },
                  '& .MuiSlider-thumb[data-index="0"] .MuiSlider-valueLabel:before': {
                    transform: 'translate(-50%, -300%) rotate(45deg)',
                  },
                }}
              />
            </Box>
          </Collapse>
          <Button sx={{ marginTop: '20px' }} onClick={applyFilters} variant="contained">
            Apply
          </Button>
        </Flex>
      </List>
    </Drawer>
  );
};

export default SideMenu;
