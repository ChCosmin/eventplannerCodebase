// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';
import {Avatar, Chip, styled} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import './EventList.styles.css';
import {EventListProps} from '../Interfaces';
import {formatString} from '../../utils/formatters';

const CustomEventChip = styled(Chip)`
  width: fit-content;
  display: flex;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  margin-bottom: 20px;
  font-weight: bold;
  cursor: pointer;

  :nth-of-type(even) {
    margin-left: 50%;
  }

  :hover {
    background: lightgray;
  }

  span {
    margin: 0 10px;
  }
`;

const EventList = (props: EventListProps) => {
  const {handleSubscribeClick, eventsToDisplay, subscriptions} = props;
  // TODO add color coded badges
  return (
    <div className="event-list">
      {eventsToDisplay.map(event => (
        <CustomEventChip
          key={event.id}
          onDelete={() => handleSubscribeClick(event.id)}
          label={event.title}
          deleteIcon={subscriptions.find(el => el.id === event.id) ? <StarIcon sx={{fill: '#4b0082'}} /> : <StarBorderIcon />}
          avatar={event.image ? <Avatar src={event.image} /> : <Avatar>{formatString(event.title)}</Avatar>}
        />
      ))}
    </div>
  );
};
export default EventList;
