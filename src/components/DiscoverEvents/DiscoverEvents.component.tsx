// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';
import {Chip, styled} from '@mui/material';
import './DiscoverEvents.styles.css';
import {DiscoverEventsProps} from '../Interfaces';

const CustomSortbyChip = styled(Chip)`
  background: rgba(75, 0, 130, ${props => (props.variant === 'filled' ? '0.8' : '0.1')});
  font-weight: 600;
  color: ${props => (props.variant === 'filled' ? '#fff' : 'rgba(75, 0, 130, 0.8)')};
  border: none;
  margin-left: 10px;
  cursor: pointer;
  user-select: none;
`;

const texts = {
  TITLE: 'Discover Upcoming Events:',
  SORTBY: 'Sort by:'
};

const DiscoverEvents = (props: DiscoverEventsProps) => {
  const {sortByFilters, activeFilters, onFilterClick} = props;
  return (
    <div className="discover-events_container" data-testid="discover-events_container">
      <h4 className="discover-events_title">{texts.TITLE}</h4>
      <div className="discover-events_sort-by">
        <span className="discover-events_sort-by-label">{texts.SORTBY}</span>
        {sortByFilters.map((filter: string) => (
          <CustomSortbyChip
            data-testid="discover-event_filter"
            data-isactive={activeFilters.includes(filter)}
            onClick={onFilterClick}
            variant={activeFilters.includes(filter) ? 'filled' : 'outlined'}
            key={filter}
            label={filter}
          />
        ))}
      </div>
    </div>
  );
};
export default DiscoverEvents;
