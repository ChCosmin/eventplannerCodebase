// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';
import {Avatar, Chip, styled} from '@mui/material';
import './NextEvent.styles.css';
import {NextEventProps} from '../Interfaces';
import {formatDate} from '../../utils/formatters';

const CustomDateChip = styled(Chip)`
  background: #3d3d3d;
  color: #eee;
  width: fit-content;
  height: fit-content;
  padding: 4px 20px;
  margin-top: 10px;
  align-self: flex-end;
`;

const texts = {
  TITLE: 'Your next event:'
};

const NextEvent = (props: NextEventProps) => {
  const {title, description, startDate, image} = props;

  return (
    <div className="next-event_container" data-testid="next-event_container">
      <h4 className="next-event_title">{texts.TITLE}</h4>
      <div className="next-event">
        <div className="next-event_group">
          <div className="next-event_logo-container">
            <Avatar src={image} sx={{width: 100, height: 100, borderRadius: 5}} variant="rounded" alt="event planner next event logo" />
          </div>
          <div className="next-event_info">
            <h3 className="next-event_info-title">{title}</h3>
            <span>{description}</span>
          </div>
        </div>
        <CustomDateChip label={startDate ? formatDate(startDate) : ''} />
      </div>
    </div>
  );
};
export default NextEvent;
