export function getEventList() {
  return fetch('http://localhost:3333/eventList').then(data => data.json());
}

