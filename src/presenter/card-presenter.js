import { render } from '../framework/render.js';
import CardView from '../view/card-view.js';
import PopupView from '../view/popup-view.js';


export default class CardPresenter {

  #cardFilmContainer = null;
  #mainBody = null;
  #card = null;
  #filmCardComponent = null;
  #popupComponent = null;

  constructor({ cardFilmContainer, mainBody }) {
    this.#cardFilmContainer = cardFilmContainer;
    this.#mainBody = mainBody;
  }


  init(card) {

    this.#card = card;

    const onEscKeyClosed = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        onClosedPopupDetails.call(this);
        document.removeEventListener('keydown', onEscKeyClosed);
      }
    };

    this.#filmCardComponent = new CardView({
      card: this.#card,
      onOpenPopup: () => {
        onOpenPopupDetails.call(this);
        document.addEventListener('keydown', onEscKeyClosed);
      }
    });

    render(this.#filmCardComponent, this.#cardFilmContainer.element);

    this.#popupComponent = new PopupView({
      card: this.#card,
      onCloseButtonClick: () => {
        onClosedPopupDetails.call(this);
        document.removeEventListener('keydown', onEscKeyClosed);
      }
    });

    function onOpenPopupDetails() {
      this.#mainBody.classList.add('hide-overflow');
      render(this.#popupComponent, this.#mainBody);
    }

    function onClosedPopupDetails() {
      this.#mainBody.classList.remove('hide-overflow');
      this.#mainBody.removeChild(this.#popupComponent.element);
    }
  }
}
