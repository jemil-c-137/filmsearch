import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState, useRef, useEffect } from 'react';
import { HEADER_HEIGHT, RIGHT_SIDE_MENU_WIDTH } from '../utils/helpers/constants';
import { SortingField, Order, SortBy } from '../interfaces/globalTypes';
import { Flex } from '../elements';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import useOnClickOutside from '../utils/hooks/useOutsideClick';
import { useApolloClient } from '@apollo/client';
import { ALL_FILMS } from '../pages/MainPage';
import { useQueriesContext } from '../context/QueriesContext';

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

const SideMenu = () => {
  const sorting = Object.keys(SortingField).reduce((prev, current) => {
    return [
      ...prev,
      { field: current as SortingField, order: Order.ASC },
      { field: current as SortingField, order: Order.DESC },
    ];
  }, [] as { field: SortingField; order: Order }[]);

  const ref = useRef<HTMLDivElement>(null);

  const { updateQueryVariables } = useQueriesContext();

  const [sortBy, setSortBy] = useState<SortBy>({ field: SortingField.title, order: Order.ASC });
  const [show, setShow] = useState(false);

  useOnClickOutside(ref, () => setShow(false));

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
        },
      }}
      variant="permanent"
      anchor="left">
      <Divider />
      <List>
        <Flex direction="column">
          <Typography variant="subtitle1" gutterBottom component="div">
            Sort by:
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
          </Typography>
        </Flex>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
