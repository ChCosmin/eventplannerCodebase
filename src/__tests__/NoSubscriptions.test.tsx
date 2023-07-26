import React from 'react';
import {render, screen} from '@testing-library/react';

import NoSubscriptions from '../components/NoSubscriptions/NoSubscriptions.component';

function renderNoSubscriptions() {
  return render(<NoSubscriptions />);
}

describe('<NoSubscriptions />', () => {
  test('should display container', async () => {
    renderNoSubscriptions();

    const container = await screen.findByTestId('no-subs-found');

    expect(container).toBeInTheDocument();
  });
});
