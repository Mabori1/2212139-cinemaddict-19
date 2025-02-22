import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/empty-list.js';
import CardPresenter from './card-presenter.js';
import { updateItem } from '../utils/common.js';
import { ExtraType, SortType } from '../const.js';
import { sortComment, sortDate, sortRating } from '../utils/sort.js';
import ExtraFilmView from '../view/extra-view.js';


const MOVIE_COUNT_PER_STEP = 5;

export default class BoardPresenter {

  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  #siteMainComponent = null;
  #moviesModel = null;
  #commentsModel = null;
  #boardMovies = [];
  #loadMoreButtonComponent = null;

  #filmsComponent = new BoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #extraRatingContainerComponent = new FilmsContainerView();
  #extraCommentContainerComponent = new FilmsContainerView();
  #extraRatingComponent = new ExtraFilmView(ExtraType.RATING);
  #extraCommentComponent = new ExtraFilmView(ExtraType.COMMENT);
  #sortComponent = null;
  #emptyViewComponent = new EmptyView();
  #mainBody = null;
  #cardPresenterMap = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardMovies = [];
  #boardComments = [];

  constructor({ siteMainElement, bodyElement, moviesModel, commentsModel }) {
    this.#siteMainComponent = siteMainElement;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#mainBody = bodyElement;
  }

  init() {

    this.#boardMovies = [...this.#moviesModel.movies];
    this.#sourcedBoardMovies = [...this.#moviesModel.movies];
    this.#boardComments = [...this.#commentsModel.comments];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#cardPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleCardChange = (updatedCard) => {
    this.#boardMovies = updateItem(this.#boardMovies, updatedCard);
    this.#sourcedBoardMovies = updateItem(this.#sourcedBoardMovies, updatedCard);
    this.#cardPresenterMap.get(updatedCard.id).init(updatedCard, this.#boardComments);
  };

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
      .forEach((card) => this.#renderCard(card, this.#filmsContainerComponent));
  };

  #sortMovies(sortType) {

    switch (sortType) {
      case SortType.DATE:
        this.#boardMovies.sort(sortDate);
        break;
      case SortType.RATING:
        this.#boardMovies.sort(sortRating);
        break;
      default:
        this.#boardMovies = [...this.#sourcedBoardMovies];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {

    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortMovies(sortType);
    this.#clearCardList();
    this.#renderMoviesList();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#filmsComponent.element, RenderPosition.AFTERBEGIN);
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

  #renderCard(card, container) {

    const cardPresenter = new CardPresenter({
      cardFilmContainer: container,
      mainBody: this.#mainBody,
      onDataChange: this.#handleCardChange,
      onModeChange: this.#handleModeChange
    });

    cardPresenter.init(card, this.#boardComments);
    this.#cardPresenterMap.set(card.id, cardPresenter);
  }

  #clearCardList() {
    this.#cardPresenterMap.forEach((presenter) => presenter.destroy());
    this.#cardPresenterMap.clear();
    this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #renderExtraBox() {
    render(this.#extraRatingComponent, this.#filmsComponent.element);
    render(this.#extraRatingContainerComponent, this.#extraRatingComponent.element);

    this.#boardMovies.sort(sortRating)
      .slice(0, 2)
      .forEach((card) => this.#renderCard(card, this.#extraRatingContainerComponent));

    render(this.#extraCommentComponent, this.#filmsComponent.element);
    render(this.#extraCommentContainerComponent, this.#extraCommentComponent.element);

    this.#boardMovies.sort(sortComment)
      .slice(0, 2)
      .forEach((card) => this.#renderCard(card, this.#extraCommentContainerComponent));


  }

  #renderBoard() {
    render(this.#filmsComponent, this.#siteMainComponent);

    if (!this.#boardMovies.length) {
      this.#renderEmptyView();
      return;
    }

    this.#renderSort();
    this.#renderMoviesList();
    this.#renderExtraBox();
  }
}

