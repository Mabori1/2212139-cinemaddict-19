import { remove, render, replace } from '../framework/render.js';
import CardView from '../view/card-view.js';
import PopupView from '../view/popup-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class CardPresenter {

  #cardFilmContainer = null;
  #mainBody = null;
  #card = null;
  #comments = null;
  #cardComponent = null;
  #popupComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ cardFilmContainer, mainBody, onDataChange, onModeChange }) {
    this.#cardFilmContainer = cardFilmContainer;
    this.#mainBody = mainBody;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  onEscKeyClosed = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#handleCloseButtonClick();
      document.removeEventListener('keydown', this.onEscKeyClosed);
    }
  };

  init(card, comments) {

    this.#card = card;
    this.#comments = comments;
    const prevCardComponent = this.#cardComponent;
    const prevPopupComponent = this.#popupComponent;


    this.#cardComponent = new CardView({
      card: this.#card,
      onOpenPopup: this.#handleOpenPopup,
      onFavoriteClick: this.#handleFavoriteClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick
    });

    this.#popupComponent = new PopupView({
      card: this.#card,
      comments: this.#comments,
      onCloseButtonClick: this.#handleCloseButtonClick,
      onFavoriteClick: this.#handleFavoriteClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this.#cardComponent, this.#cardFilmContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#cardComponent, prevCardComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  #OpenPopupHandler = () => {
    this.#mainBody.classList.add('hide-overflow');
    render(this.#popupComponent, this.#mainBody);
    this.#handleModeChange();
    this.#mode = Mode.POPUP;
  };

  #ClosedPopupHandler = () => {
    this.#mainBody.classList.remove('hide-overflow');
    this.#mainBody.removeChild(this.#popupComponent.element);
    this.#mode = Mode.DEFAULT;
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#handleCloseButtonClick();
    }
  };


  #handleCloseButtonClick = () => {
    this.#ClosedPopupHandler();
    document.removeEventListener('keydown', this.onEscKeyClosed);
  };

  #handleOpenPopup = () => {
    this.#OpenPopupHandler();
    document.addEventListener('keydown', this.onEscKeyClosed);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#card, userDetails: {
        ...this.#card.userDetails,
        favorite: !this.#card.userDetails.favorite
      }
    });
  };

  #handleFormSubmit = (movie) => {
    this.#handleDataChange(movie);
    this.#handleCloseButtonClick();
  };

  #handleWatchedClick = () => {
    this.#handleDataChange({
      ...this.#card, userDetails: {
        ...this.#card.userDetails,
        alreadyWatched: !this.#card.userDetails.alreadyWatched
      }
    });
  };

  #handleWatchlistClick = () => {
    this.#handleDataChange({
      ...this.#card, userDetails: {
        ...this.#card.userDetails,
        watchlist: !this.#card.userDetails.watchlist
      }
    });
  };

  destroy() {
    remove(this.#cardComponent);
    remove(this.#popupComponent);
  }
}
