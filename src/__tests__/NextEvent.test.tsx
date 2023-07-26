import React from 'react';
import {render, screen} from '@testing-library/react';

import NextEvent from '../components/NextEvent/NextEvent.component';
import {NextEventProps} from '../components/Interfaces';

const defaultProps: NextEventProps = {
  id: '1',
  title: 'Redux Basic',
  description: 'Burn of first degree of right wrist, initial encounter',
  startDate: '2023-04-13T13:26:58Z',
  endDate: '2023-04-15T13:26:58Z',
  image: 'http://dummyimage.com/162x100.png/cc0000/ffffff',
  categories: ['Coding']
};

function renderNextEvent(props: Partial<NextEventProps> = {}) {
  return render(<NextEvent {...defaultProps} {...props} />);
}

describe('<NextEvent />', () => {
  test('should display next event', async () => {
    renderNextEvent();

    const container = await screen.findByTestId('next-event_container');

    expect(container).toBeInTheDocument();
  });
});
