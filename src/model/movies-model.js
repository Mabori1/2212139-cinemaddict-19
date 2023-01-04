import { getMovie } from '../moсk/movie.js';

const MOVIE_COUNT = 50;


export default class MoviesModel {


  #movies = Array.from({ length: MOVIE_COUNT }, (_, i) => getMovie(i));

  get movies() {
    return this.#movies;
  }

}
