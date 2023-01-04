import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import CardView from '../view/card-view.js';
import { render, remove } from '../framework/render.js';
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

  #loadMoreButtonClickHandler = () => {
    this.#boardMovies
      .slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((card) => this.#renderCards(card));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= this.#boardMovies.length) {
      remove(this.#loadMoreButtonComponent);
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
      this.#loadMoreButtonComponent = new ShowMoreButtonView({
        onClick: this.#loadMoreButtonClickHandler
      });
      render(this.#loadMoreButtonComponent, this.#filmsListComponent.element);

    }
  }


  #renderCards(card) {

    const onEscKeyClosed = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        onClosedPopupDetails.call(this);
        document.removeEventListener('keydown', onEscKeyClosed);
      }
    };

    const filmCardComponent = new CardView({
      card,
      onOpenPopup: () => {
        onOpenPopupDetails.call(this);
        document.addEventListener('keydown', onEscKeyClosed);
      }
    });

    render(filmCardComponent, this.#filmsContainerComponent.element);

    const popupComponent = new PopupView({
      card,
      onCloseButtonClick: () => {
        onClosedPopupDetails.call(this);
        document.removeEventListener('keydown', onEscKeyClosed);
      }
    });

    function onOpenPopupDetails() {
      this.#mainBody.classList.add('hide-overflow');
      render(popupComponent, this.#mainBody);
    }

    function onClosedPopupDetails() {
      this.#mainBody.classList.remove('hide-overflow');
      this.#mainBody.removeChild(popupComponent.element);
    }
  }
}

