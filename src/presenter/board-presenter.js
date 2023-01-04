import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import CardView from '../view/card-view.js';
import { render } from '../framework/render.js';
import ExtraFilmsView from '../view/extra-list-view.js';
import PopupView from '../view/popup-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/empty-list.js';

const MOVIE_COUNT_PER_STEP = 5;

export default class BoardPresenter {

  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  #boardContainer = null;
  #moviesModel = null;
  #commentsModel = null;
  #boardMovies = null;
  #commentsMovies = null;
  #loadMoreButtonComponent = null;

  #boardComponent = new BoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #extraListComponent = new ExtraFilmsView();
  #mainBody = null;

  constructor({ boardContainer, bodyElement, moviesModel, commentsModel }) {
    this.#boardContainer = boardContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#mainBody = bodyElement;
  }

  init() {

    this.#boardMovies = [...this.#moviesModel.movies];
    this.#commentsMovies = [...this.#commentsModel.comments];

    this.#renderBoard();
  }

  #loadMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#boardMovies
      .slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((card) => this.#renderCards(card));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= this.#boardMovies.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };


  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardMovies.length) {
      render(new EmptyView(), this.#boardComponent.element);
      return;
    }

    render(new SortView(), this.#boardComponent.element);
    render(this.#filmsListComponent, this.#boardComponent.element);
    render(this.#filmsContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < Math.min(this.#boardMovies.length, MOVIE_COUNT_PER_STEP); i++) {
      this.#renderCards(this.#boardMovies[i]);
    }

    if (this.#boardMovies.length > MOVIE_COUNT_PER_STEP) {
      this.#loadMoreButtonComponent = new ShowMoreButtonView();
      render(this.#loadMoreButtonComponent, this.#filmsListComponent.element);

      this.#loadMoreButtonComponent.element
        .addEventListener('click', this.#loadMoreButtonClickHandler);
    }
  }


  #renderCards(card) {

    const filmCardComponent = new CardView(card);
    const popupComponent = new PopupView(card);

    const openPopupDetails = () => {
      this.#mainBody.classList.add('hide-overflow');
      render(popupComponent, this.#mainBody);
    };

    const closedPopupDetails = () => {
      this.#mainBody.classList.remove('hide-overflow');
      this.#mainBody.removeChild(popupComponent.element);

    };

    const onEscKeyClosed = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closedPopupDetails();
        document.removeEventListener('keydown', onEscKeyClosed);
      }
    };

    render(filmCardComponent, this.#filmsContainerComponent.element);

    filmCardComponent.element.querySelector('img').addEventListener('click', () => {
      openPopupDetails();
      document.addEventListener('keydown', onEscKeyClosed);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closedPopupDetails();
      document.removeEventListener('keydown', onEscKeyClosed);
    });

  }
}

