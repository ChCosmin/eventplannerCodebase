export function getFilters() {
  return fetch('http://localhost:3333/filters').then(data => data.json());
}
