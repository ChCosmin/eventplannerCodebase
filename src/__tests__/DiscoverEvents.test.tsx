import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

import DiscoverEvents from '../components/DiscoverEvents/DiscoverEvents.component';
import {DiscoverEventsProps} from 'components/Interfaces';

const defaultProps: DiscoverEventsProps = {
  sortByFilters: ['Coding', 'Team', 'Social'],
  activeFilters: [],
  onFilterClick() {
    return;
  }
};

function renderDiscoverEvents(props: Partial<DiscoverEventsProps> = {}) {
  return render(<DiscoverEvents {...defaultProps} {...props} />);
}

describe('<DiscoverEvents />', () => {
  test('should display all filters', async () => {
    renderDiscoverEvents();

    const discoverEvContainer = await screen.findByTestId('discover-events_container');
    const filters = await screen.findAllByTestId('discover-event_filter');

    expect(discoverEvContainer).toBeInTheDocument();
    expect(filters.length).toEqual(3);
    expect(filters[0]).toHaveTextContent('Coding');
    expect(filters[1]).toHaveTextContent('Team');
    expect(filters[2]).toHaveTextContent('Social');
  });

  test('should fire onClick on filter click', async () => {
    const onFilterClick = jest.fn();
    renderDiscoverEvents({onFilterClick});
    const filters = await screen.findAllByTestId('discover-event_filter');

    await fireEvent.click(filters[0]);
    expect(onFilterClick).toHaveBeenCalledTimes(1);
  });

  test('should activate filter on filter click', async () => {
    const activeFilters = ['Coding'];
    renderDiscoverEvents({activeFilters});
    const filters = await screen.findAllByTestId('discover-event_filter');

    expect(filters[0]).toHaveAttribute('data-isactive', 'true');
  });
});
