import { movie } from '../moсk/movie.js';

const MOVIE_COUNT = 5;

export default class TasksModel {
  movies = Array.from({ length: MOVIE_COUNT }, movie);

  getTasks() {
    return this.movies;
  }
}
