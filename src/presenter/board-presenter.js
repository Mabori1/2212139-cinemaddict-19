import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { render, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/empty-list.js';
import CardPresenter from './card-presenter.js';

const MOVIE_COUNT_PER_STEP = 5;

export default class BoardPresenter {

  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  siteMainComponent = null;
  #moviesModel = null;
  #commentsModel = null;
  #boardMovies = null;
  #loadMoreButtonComponent = null;

  #filmsComponent = new BoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #sortComponent = new SortView();
  #emptyViewComponent = new EmptyView();
  #mainBody = null;

  constructor({ siteMainElement, bodyElement, moviesModel, commentsModel }) {
    this.siteMainComponent = siteMainElement;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#mainBody = bodyElement;
  }

  init() {

    this.#boardMovies = [...this.#moviesModel.movies];

    this.#renderBoard();
  }

  #loadMoreButtonClickHandler = () => {
    this.#renderMovies(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP);

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= this.#boardMovies.length) {
      remove(this.#loadMoreButtonComponent);
    }

  };

  #renderMovies = (from, to) => {
    this.#boardMovies
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmsComponent.element);
  };

  #renderEmptyView = () => {
    render(this.#emptyViewComponent, this.#filmsComponent.element);
  };

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#loadMoreButtonClickHandler
    });
    render(this.#loadMoreButtonComponent, this.#filmsListComponent.element);
  }

  #renderMoviesList() {
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsContainerComponent, this.#filmsListComponent.element);

    this.#renderMovies(0, Math.min(this.#boardMovies.length, MOVIE_COUNT_PER_STEP));

    if (this.#boardMovies.length > MOVIE_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderCard(card) {

    const cardPresenter = new CardPresenter({
      cardFilmContainer: this.#filmsContainerComponent,
      mainBody: this.#mainBody
    });

    cardPresenter.init(card);
  }

  #renderBoard() {
    render(this.#filmsComponent, this.siteMainComponent);

    if (!this.#boardMovies.length) {
      this.#renderEmptyView();
      return;
    }

    this.#renderSort();
    this.#renderMoviesList();
  }
}

