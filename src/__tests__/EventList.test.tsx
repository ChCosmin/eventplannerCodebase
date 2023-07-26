import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

import EventList from '../components/EventList/EventList.component';
import {EventListProps} from 'components/Interfaces';

const defaultProps: EventListProps = {
  handleSubscribeClick() {
    return;
  },
  eventsToDisplay: [
    {
      id: '1',
      title: 'Redux Basic',
      description: 'Burn of first degree of right wrist, initial encounter',
      startDate: '2023-04-13T13:26:58Z',
      endDate: '2023-04-15T13:26:58Z',
      image: 'http://dummyimage.com/162x100.png/cc0000/ffffff',
      categories: ['Coding']
    },
    {
      id: '2',
      title: 'Office Party',
      description: 'Underdosing of other primarily systemic and hematological agents',
      startDate: '2023-04-08T18:22:28Z',
      endDate: '2023-04-18T18:22:28Z',
      image: '',
      categories: ['Social', 'Team']
    }
  ],
  subscriptions: []
};

function renderEventList(props: Partial<EventListProps> = {}) {
  return render(<EventList {...defaultProps} {...props} />);
}

describe('<NextEvent />', () => {
  test('should display eventList', async () => {
    renderEventList();
    const evListContainer = await screen.findByTestId('event-list');

    const events = await screen.findAllByTestId('event-list_item');

    expect(evListContainer).toBeInTheDocument();
    expect(events.length).toEqual(2);
  });

  test('should fire onClick on event star click', async () => {
    const handleSubscribeClick = jest.fn();
    renderEventList({handleSubscribeClick});

    const events = await screen.findAllByTestId('StarBorderIcon');

    fireEvent.click(events[0]);
    expect(handleSubscribeClick).toHaveBeenCalledTimes(1);
  });

  test('should subscribe on event star click', async () => {
    const subscriptions = [
      {
        id: '1',
        title: 'Redux Basic',
        description: 'Burn of first degree of right wrist, initial encounter',
        startDate: '2023-04-13T13:26:58Z',
        endDate: '2023-04-15T13:26:58Z',
        image: 'http://dummyimage.com/162x100.png/cc0000/ffffff',
        categories: ['Coding']
      }
    ];
    renderEventList({subscriptions});

    const event = await screen.findAllByTestId('StarIcon');
    expect(event).toBeDefined();
  });

  test('should display avatar or title initials if no avatar provided', () => {
    renderEventList();

    const initials = screen.getByText('OP');
    const avatar = screen.getByTestId('event-list_item-avatar');

    expect(initials).toBeDefined();
    expect(avatar).toBeDefined();
  });
});
