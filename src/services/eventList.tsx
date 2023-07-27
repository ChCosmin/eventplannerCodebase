import mockedData from '../mockData/mockData.json';

export function getEventList() {
  // if npm run api isn't running return mockData
  return fetch('http://localhost:3333/eventList')
    .then(data => data.json())
    .catch(err => {
      console.log(err);
      return mockedData;
    });
}
