// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React, {useEffect, useState} from 'react';
import './EventPlanner.styles.css';
import {CircularProgress, styled} from '@mui/material';

import NextEvent from '../NextEvent/NextEvent.component';
import DiscoverEvents from '../DiscoverEvents/DiscoverEvents.component';
import EventList from '../EventList/EventList.component';
import EventPlannerHeader from './EventPlannerHeader.component';
import NoSubscriptions from '../NoSubscriptions/NoSubscriptions.component';

import {NextEventProps} from '../Interfaces';
import {getFilters, getNextEvent} from '../../utils/formatters';
import {getEventList} from '../../services/eventList';
// import {getSubscriptions, setSubscription} from '../../services/subscriptions';

const CustomLoadingSpinner = styled(CircularProgress)`
  position: relative;
  z-index: 3;
`;

const EventPlanner = () => {
  const [eventList, setEventList] = useState<NextEventProps[] | []>([]);
  const [eventsToDisplay, setEventsToDisplay] = useState<NextEventProps[] | []>([]);
  const [nextEvent, setNextEvent] = useState<NextEventProps | {}>({});

  const [sortByFilters, setSortByFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const [subscriptions, setSubscriptions] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const [isEventListLoading, setIsEventListLoading] = useState(false);

  const [theme, setTheme] = useState('light');

  // get events from update eventList
  useEffect(() => {
    setIsEventListLoading(true);
    getEventList()
      .then(list => {
        setEventList(list);
        setEventsToDisplay(list);
        setIsEventListLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // get all existing unique filters from the event list
  useEffect(() => {
    if (eventList.length) {
      const filters = getFilters(eventList);
      setSortByFilters(filters);
    }
  }, [eventList]);

  // didn't manage to make it fully work in time
  // useEffect(() => {
  //   getSubscriptions().then(subs => {
  //     // setSubscriptions(subs);
  //     console.log(subs);
  //   });
  // }, []);

  // reset events to display if no filters selected;
  useEffect(() => {
    if (activeFilters.length === 0) setEventsToDisplay(eventList);
  }, [activeFilters, eventList]);

  // if subscriptions exist, show event closest to today
  useEffect(() => {
    const updateNextEvent = getNextEvent(subscriptions);

    if (updateNextEvent) setNextEvent(updateNextEvent);
  }, [subscriptions]);

  // persist theme, theme functionality no fully implemented
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSubscribeClick = (event: NextEventProps) => {
    const isSubscribed = subscriptions.find(el => el.id === event.id);
    const newSubscriptions = [...subscriptions];

    if (isSubscribed) {
      newSubscriptions.splice(newSubscriptions.indexOf(isSubscribed), 1);
    } else {
      newSubscriptions.push(event);
    }
    setSubscriptions([...newSubscriptions]);
    // setSubscription([...newSubscriptions]);
  };

  const handleSortByClick = (event: any) => {
    const filterName = event.target.textContent; // get clicked filter name
    const newActiveFilters = [...activeFilters];
    let newEventsToDisplay = [...eventsToDisplay];

    //if filter already selected
    if (activeFilters.includes(filterName)) {
      const newEvents = eventsToDisplay?.filter((event: NextEventProps) => !event.categories.includes(filterName)); // get events to display that aren't that filter
      newActiveFilters.splice(activeFilters.indexOf(filterName), 1); //remove selected filter
      newEventsToDisplay = newEvents;
    } else {
      // if filter wasn't selected b4
      newActiveFilters.push(filterName); // add it to the active filter list
      const eventsWithFilterName = eventList.filter((el: NextEventProps) => el.categories?.includes(filterName)); // add event that have selected filter
      newEventsToDisplay = [...eventsWithFilterName];
      activeFilters.forEach((filter: string) => {
        // add rest events that were already selected
        const ev = eventList.filter((events: NextEventProps) => events.categories?.includes(filter));
        newEventsToDisplay.push(...ev);
      });
    }
    setEventsToDisplay([...new Set(newEventsToDisplay)]);
    setActiveFilters([...new Set(newActiveFilters)]);
  };

  const handleDarkModeClick = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    setIsDark(!isDark);
  };

  const displayNextEvent = Object.keys(nextEvent).length;

  return (
    <div className={`event-planner_container ${theme}`}>
      <EventPlannerHeader isDark={isDark} handleDarkModeClick={handleDarkModeClick} />
      {displayNextEvent ? <NextEvent {...nextEvent} /> : <NoSubscriptions />}
      <DiscoverEvents onFilterClick={handleSortByClick} sortByFilters={sortByFilters} activeFilters={activeFilters} />
      {isEventListLoading ? (
        <CustomLoadingSpinner color="secondary" />
      ) : (
        <EventList subscriptions={subscriptions} handleSubscribeClick={handleSubscribeClick} eventsToDisplay={eventsToDisplay} />
      )}

      <div className="background-circle" />
    </div>
  );
};

export default EventPlanner;
