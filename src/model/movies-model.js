import { getMovie } from '../moсk/movie.js';

const MOVIE_COUNT = 5;


export default class MoviesModel {


  movies = Array.from({ length: MOVIE_COUNT }, (_, i) => getMovie(i));

  get() {
    return this.movies;
  }

}
