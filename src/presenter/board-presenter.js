import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import CardView from '../view/card-view.js';
import { render } from '../render.js';
import { getCommentsMovie } from '../utils/movie.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  filmsListComponent = new FilmsListView();
  filmsContainerComponent = new FilmsContainerView();

  constructor({ boardContainer, bodyElement, moviesModel, commentsModel }) {
    this.boardContainer = boardContainer;
    this.moviesModel = moviesModel;
    this.commentsModel = commentsModel;
    this.bodyElement = bodyElement;
  }

  init() {
    this.boardMovies = [...this.moviesModel.get()];
    this.commentsMovies = [...this.commentsModel.get()];

    render(this.boardComponent, this.boardContainer);
    render(this.filmsListComponent, this.boardComponent.getElement());
    render(this.filmsContainerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < this.boardMovies.length; i++) {

      this.comments = getCommentsMovie(this.commentsMovies, this.boardMovies[i].comments);
      render(new CardView(this.boardMovies[i]), this.filmsContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.boardComponent.getElement());
  }
}
