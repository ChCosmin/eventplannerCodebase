// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React, {useEffect, useState} from 'react';
import './EventPlanner.styles.css';

import NextEvent from '../NextEvent/NextEvent.component';
import DiscoverEvents from '../DiscoverEvents/DiscoverEvents.component';
import EventList from '../EventList/EventList.component';
import EventPlannerTitle from './EventPlannerTitle.component';
import mockedData from '../../mockData/mockData.json';
import {getFilters, getNextEvent} from '../../utils/formatters';
import {NextEventProps} from '../Interfaces';
import NoSubscriptions from './NoSubscriptions.component';

const EventPlanner = () => {
  const [eventList, setEventList] = useState<NextEventProps[] | []>([]);
  const [eventsToDisplay, setEventsToDisplay] = useState<NextEventProps[] | []>([]);
  const [nextEvent, setNextEvent] = useState<NextEventProps | {}>({});

  const [sortByFilters, setSortByFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const [subscriptions, setSubscriptions] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setEventList(mockedData);
    setEventsToDisplay(mockedData);
  }, []);

  // get all existing unique filters from the event list
  useEffect(() => {
    if (eventList.length) {
      const filters = getFilters(eventList);
      setSortByFilters(filters);
    }
  }, [eventList]);

  // if all filters are disabled, show all events
  useEffect(() => {
    if (activeFilters.length === 0) setEventsToDisplay(eventList);
  }, [activeFilters, eventList]);

  useEffect(() => {
    if (subscriptions.length) setNextEvent({});
  }, [subscriptions]);

  useEffect(() => {
    const updateNextEvent = getNextEvent(subscriptions);

    if (updateNextEvent) setNextEvent(updateNextEvent);
  }, [subscriptions]);

  const handleSubscribeClick = (id: string) => {
    const isSubscribed = subscriptions.find(el => el.id === id);
    const eventToSubscribe = eventsToDisplay.find((el: NextEventProps) => el.id === id);
    const newSubscriptions = [...subscriptions];

    if (isSubscribed) {
      newSubscriptions.splice(newSubscriptions.indexOf(isSubscribed), 1);
    } else {
      newSubscriptions.push(eventToSubscribe);
    }

    setSubscriptions([...newSubscriptions]);
  };
  const handleSortByClick = (event: any) => {
    const filterName = event.target.textContent; // get clicked filter name
    const newActiveFilters = [...activeFilters];
    let newEventsToDisplay = [...eventsToDisplay];
    if (activeFilters.includes(filterName)) {
      //if filter already selected
      const newEvents = eventsToDisplay?.filter((event: NextEventProps) => !event.categories.includes(filterName)); // get events to display that aren't that filter
      newActiveFilters.splice(activeFilters.indexOf(filterName), 1); //remove selected filter
      newEventsToDisplay = newEvents;
    } else {
      // if filter wasn't selected b4
      newActiveFilters.push(filterName); // add it to the active filter list
      const eventsWithFilterName = eventList.filter((el: NextEventProps) => el.categories?.includes(filterName));
      newEventsToDisplay = [...eventsWithFilterName];
      activeFilters.forEach((filter: string) => {
        const ev = eventList.filter((events: NextEventProps) => events.categories?.includes(filter));
        newEventsToDisplay.push(...ev);
      });
    }
    setEventsToDisplay([...new Set(newEventsToDisplay)]);
    setActiveFilters([...new Set(newActiveFilters)]);
  };

  const handleDarkModeClick = () => {
    setIsDark(!isDark);
  };

  // useEffect(() => {
  //   setCount(JSON.parse(window.localStorage.getItem('count')));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('count', count);
  // }, [count]);

  const displayNextEvent = Object.keys(nextEvent).length;
  // console.log(isDark);
  return (
    <div className="event-planner_container">
      <EventPlannerTitle isDark={isDark} handleDarkModeClick={handleDarkModeClick} />
      {displayNextEvent ? <NextEvent {...nextEvent} /> : <NoSubscriptions />}
      <DiscoverEvents onFilterClick={handleSortByClick} sortByFilters={sortByFilters} activeFilters={activeFilters} />
      <EventList subscriptions={subscriptions} handleSubscribeClick={handleSubscribeClick} eventsToDisplay={eventsToDisplay} />

      <div className="background-circle" />
    </div>
  );
};

export default EventPlanner;
