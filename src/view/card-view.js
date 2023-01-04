import AbstractView from '../framework/view/abstract-view.js';


function createCardTemplate(movie) {

  const { id, comments, film_info: { title, poster, release, duration, genre, description, }, user_details: {
    watchlist, favorite } } = movie;

  return (`<article id=${id} class="film-card">
            <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${movie.film_info.total_rating}</p>
            <p class="film-card__info">
            <span class="film-card__year">${release.date}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
            </p>
            <img src=${poster}
            alt="poster"
            class="film-card__poster"
          />
          <p class="film-card__description">
            ${description}
          </p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button
            class="film-card__controls-item film-card__controls-item--add-to-watchlist
            ${watchlist ? 'film-card__controls-item--active' : ''}"
            type="button"
          >
            Add to watchlist
          </button>
          <button
            class="film-card__controls-item film-card__controls-item--mark-as-watched
            ${movie.user_details.already_watched ? 'film-card__controls-item--active' : ''}"
            type="button"
          >
            Mark as watched
          </button>
          <button
            class="film-card__controls-item film-card__controls-item--favorite
            ${favorite ? 'film-card__controls-item--active' : ''}"
            type="button"
          >
            Mark as favorite
          </button>
        </div>
      </article>`
  );
}

export default class CardView extends AbstractView {

  #movie = null;
  #handleOpenPopup = null;

  constructor({ card, onOpenPopup }) {
    super();
    this.#movie = card;
    this.#handleOpenPopup = onOpenPopup;

    this.element.querySelector('.film-card__poster')
      .addEventListener('click', this.#popupOpenHandler);
  }

  get template() {
    return createCardTemplate(this.#movie);
  }

  #popupOpenHandler = (evt) => {
    evt.preventDefault();
    this.#handleOpenPopup();
  };
}
