import { getMovie } from '../moсk/movie.js';

const MOVIE_COUNT = 12;


export default class MoviesModel {


  #movies = Array.from({ length: MOVIE_COUNT }, getMovie);

  get movies() {
    return this.#movies;
  }

}
