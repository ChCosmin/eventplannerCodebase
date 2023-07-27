// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';

const texts = {NOSUBS: 'No subscriptions found'};

const NoSubscriptions = () => {
  return (
    <div className="no-subs-found" data-testid="no-subs-found">
      {texts.NOSUBS}
    </div>
  );
};
export default NoSubscriptions;
