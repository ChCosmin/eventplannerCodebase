import {NextEventProps} from 'src/components/Interfaces';
import {format, closestTo} from 'date-fns';

export const formatString = (string: string) => {
  var matches = string.match(/\b(\w)/g);

  return matches.join('');
};

export const getFilters = (eventList: NextEventProps[]) => {
  const filters = [];

  eventList.forEach((event: NextEventProps) => {
    filters.push(...event.categories);
  });

  return [...new Set(filters)];
};

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = format(newDate, 'MMM, do | p');

  return formattedDate;
};

export const getNextEvent = (subscriptions: NextEventProps[]) => {
  const today = new Date();
  let dates = [];
  let closestDate = new Date();
  let nextEvent = {};

  if (subscriptions.length) {
    dates = subscriptions.map(el => new Date(el.startDate));
    closestDate = closestTo(today, dates);
    nextEvent = subscriptions.find(el => new Date(el.startDate).getTime() === closestDate.getTime());
  }

  return nextEvent;
};
