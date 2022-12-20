import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import CardView from '../view/card-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  filmsListComponent = new FilmsListView();
  filmsContainerComponent = new FilmsContainerView();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(this.filmsListComponent, this.boardComponent.getElement());
    render(this.filmsContainerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new CardView(), this.filmsContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.boardComponent.getElement());
  }
}
