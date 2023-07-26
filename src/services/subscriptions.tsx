import {NextEventProps} from 'components/Interfaces';

export function getSubscriptions() {
  return fetch('http://localhost:3333/subscriptions').then(data => data.json());
}

export function setSubscription(subscriptions: NextEventProps[]) {
  console.log(subscriptions, JSON.stringify(subscriptions));
  return fetch('http://localhost:3333/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscriptions)
  }).then(data => {
    data.json();
  });
}
