import { FilterType } from '../const';


const filter = {
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.user_details.watchlist),
  [FilterType.HISTORY]: (movies) => movies,
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.user_details.favorite),
};

export { filter };
