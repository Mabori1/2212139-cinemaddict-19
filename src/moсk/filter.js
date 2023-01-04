import { filter } from '../utils/filter.js';

function generateFilter(movies) {
  return Object.entries(filter).map(
    ([filterName, filterMovies]) => ({
      name: filterName,
      count: filterMovies(movies).length,
    }),
  );
}

export { generateFilter };
