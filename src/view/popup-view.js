import AbstractView from '../framework/view/abstract-view.js';

function createPopupTemplate(movie) {

  const { filmInfo: { title, poster, director, writers, actors, duration, genre,
    description, ageRating, totalRating,
    release: { date, releaseCountry } }, userDetails: { favorite, watchlist, alreadyWatched } } = movie;

  return `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${poster} alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched ${alreadyWatched ? 'film-card__controls-item--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite
        ${favorite ? 'film-card__controls-item--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>
  </div>
</section>`;
}

export default class PopupView extends AbstractView {

  #movie = null;
  #handleCloseButtonClick = null;
  #handleFavoriteClick = null;
  #handleWatchListClick = null;
  #handleWatchedClick = null;


  constructor({ card, onCloseButtonClick, onFavoriteClick, onWatchlistClick, onWatchedClick }) {
    super();
    this.#movie = card;
    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleWatchListClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#popupCloseHandler);

    this.element.querySelector('#favorite')
      .addEventListener('click', this.#favoriteClickHandler);

    this.element.querySelector('#watchlist')
      .addEventListener('click', this.#watchListClickHandler);

    this.element.querySelector('#watched')
      .addEventListener('click', this.#watchedClickHandler);
  }

  get template() {
    return createPopupTemplate(this.#movie);
  }

  #popupCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseButtonClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchListClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchedClick();
  };

}
