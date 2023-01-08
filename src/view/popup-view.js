import { EMOTIONS } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getCommentsMovie } from '../utils/movie.js';


const commentsListView = (comments) => comments
  .map((comment) =>
    ` <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${comment.date}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
  ).join('');

const createPosterTemplate = (poster) => (
  `${poster?.length ? `<img class="film-details__poster-img" src="${poster}" alt="">` : ''}`
);

const createTotalRatingTemplate = (totalRating) => (
  `${totalRating ? `<div class="film-details__rating">
    <p class="film-details__total-rating">${totalRating}</p>
  </div>` : ''}`
);

const createTitleTemplate = (title) => (
  `${title?.length
    ? `<h3 class="film-details__title">${title}</h3>`
    : ''}`
);

const createAlternativeTitleTemplate = (alternativeTitle) => (
  `${alternativeTitle?.length
    ? `<p class="film-details__title-original">Original: ${alternativeTitle}</p>`
    : ''}`
);

const createDirectorTemplate = (director) => (
  `${director?.length
    ? `<tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${director}</td>
        </tr>`
    : ''}`
);

const createWritersTemplate = (writers) => (
  `${writers?.length
    ? `<tr class="film-details__row">
            <td class="film-details__term">${writers.length > 1 ? 'Writers' : 'Writer'}</td>
            <td class="film-details__cell">${writers.join(', ')}</td>
          </tr>`
    : ''}`
);

const createActorsTemplate = (actors) => (
  `${actors?.length
    ? `<tr class="film-details__row">
            <td class="film-details__term">${actors.length > 1 ? 'Actors' : 'Actor'}</td>
            <td class="film-details__cell">${actors.join(', ')}</td>
          </tr>`
    : ''}`
);

const createReleaseDateTemplate = (release) => (
  `${release.date?.length
    ? `<tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${release.date}</td>
        </tr>`
    : ''}`
);

const createRuntimeTemplate = (duration) => (
  `${duration
    ? `<tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">
              ${duration}
            </td>
        </tr>`
    : ''}`
);

const createGenresTemplate = (genres) => (
  `${genres?.length
    ? `<tr class="film-details__row">
          <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
          <td class="film-details__cell">
            ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('')}
        </tr>`
    : ''}`
);

const createCountryTemplate = (release) => (
  `${release.releaseCountry?.length
    ? `<tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${release.releaseCountry}</td>
        </tr>`
    : ''}`
);

const createDescriptionTemplate = (description) => (
  `${description?.length
    ? `<p class="film-details__film-description">${description}</p>`
    : ''}`
);

const createAgeRatingTemplate = (ageRating) => (
  `${ageRating !== null
    ? `<p class="film-details__age">${ageRating}</p>`
    : ''}`
);

const createEmojiListItemTemplate = (item, emotion) => (
  `
    <input
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${item}"
      value="${item}"
      ${item === emotion ? 'checked' : ''}
    >
    <label
      class="film-details__emoji-label"
      for="emoji-${item}"
    >
      <img
        src="./images/emoji/${item}.png"
        width="30" height="30"
        alt="emoji"
      >
    </label>
  `
);

const createEmojiListTemplate = (emotion) => {
  const EmojiListTemplate = EMOTIONS
    .map((item) => createEmojiListItemTemplate(item, emotion))
    .join('');

  return `
    <div class="film-details__emoji-list">
      ${EmojiListTemplate}
    </div>
  `;
};


const createPopupTemplate = (movie, comments) => {

  const {
    filmInfo: { title, poster, director, writers,
      actors, duration, genre, description, ageRating, totalRating,
      alternativeTitle, release },
    userDetails: { favorite, watchlist, alreadyWatched } } = movie;

  const commentsMovie = getCommentsMovie(comments, movie.comments);
  const emotion = movie.emotion ?? null;

  const posterTemplate = createPosterTemplate(poster);
  const totalRatingTemplate = createTotalRatingTemplate(totalRating);
  const titleTemplate = createTitleTemplate(title);
  const alternativeTitleTemplate = createAlternativeTitleTemplate(alternativeTitle);
  const directorTemplate = createDirectorTemplate(director);
  const writersTemplate = createWritersTemplate(writers);
  const actorsTemplate = createActorsTemplate(actors);
  const releaseDateTemplate = createReleaseDateTemplate(release);
  const runtimeTemplate = createRuntimeTemplate(duration);
  const countryTemplate = createCountryTemplate(release);
  const genresTemplate = createGenresTemplate(genre);
  const descriptionTemplate = createDescriptionTemplate(description);
  const ageRatingTemplate = createAgeRatingTemplate(ageRating);
  const emojiListTemplate = createEmojiListTemplate(emotion);


  return (`
<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          ${posterTemplate}
          ${ageRatingTemplate}
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              ${titleTemplate}
              ${alternativeTitleTemplate}
            </div>
            ${totalRatingTemplate}
          </div>

          <table class="film-details__table">
          ${directorTemplate}
          ${writersTemplate}
          ${actorsTemplate}
          ${releaseDateTemplate}
          ${runtimeTemplate}
          ${countryTemplate}
          ${genresTemplate}
          </table>

          ${descriptionTemplate}

        </div>
      </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">
          ${watchlist ? 'Added' : 'Add'} to watchlist
          </button>
          <button type="button" class="film-details__control-button ${alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">
          ${alreadyWatched ? 'Already watched' : 'Not Viewed'}</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">
          ${favorite ? 'Added' : 'Add'} to favorites
          </button>
        </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span
          class="film-details__comments-count">${movie.comments.length}</span></h3>

              ${movie.comments.length > 0 ? `<ul class="film-details__comments-list">
          ${commentsListView(commentsMovie)}
            </ul>` : ''}

            <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label">
              ${emotion !== null ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ''}
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
            ${emojiListTemplate}
          </form>
        </section>
      </div>
    </div>
    </section>
  `);
};

export default class PopupView extends AbstractStatefulView {

  #comments = null;
  #handleCloseButtonClick = null;
  #handleFavoriteClick = null;
  #handleWatchListClick = null;
  #handleWatchedClick = null;
  #handleFormSubmit = null;


  constructor({ card, comments, onCloseButtonClick, onFavoriteClick,
    onWatchlistClick, onWatchedClick, onFormSubmit }) {

    super();
    this._setState(PopupView.parseMovieToState(card));
    this.#comments = comments;
    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleWatchListClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFormSubmit = onFormSubmit;

    this.#innerHandlers();
  }

  get template() {
    return createPopupTemplate(this._state, this.#comments);
  }

  _restoreHandlers = () => {
    this.#innerHandlers();
    this.#setElementPosition();
  };

  #innerHandlers = () => {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#popupCloseHandler);
    this.element.querySelector('#favorite')
      .addEventListener('click', this.#favoriteClickHandler);
    this.element.querySelector('#watchlist')
      .addEventListener('click', this.#watchListClickHandler);
    this.element.querySelector('#watched')
      .addEventListener('click', this.#watchedClickHandler);
    this.#setEmojiItemsHandler();
  };

  #setEmojiItemsHandler = () => {
    const newCommentElement = this.element.querySelector('.film-details__new-comment');
    const emojiItems = newCommentElement.querySelectorAll('.film-details__emoji-item');

    emojiItems.forEach((item) => {
      item.addEventListener('change', this.#emojiItemChangeHandler);
    });
  };

  #emojiItemChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.emotion = evt.target.value;
    this._state.position = { x: 0, y: this.element.scrollTop };
    this.updateElement(this._state);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PopupView.parseStateToMovie(this._state));
  };


  #popupCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseButtonClick(PopupView.parseStateToMovie(this._state));
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.favorite = !this._state.userDetails.favorite;
    this.#savePosition();
    this.#handleFavoriteClick();
    this.updateElement(this._state);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.watchlist = !this._state.userDetails.watchlist;
    this.#savePosition();
    this.#handleWatchListClick();
    this.updateElement(this._state);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.alreadyWatched = !this._state.userDetails.alreadyWatched;
    this.#savePosition();
    this.#handleWatchedClick();
    this.updateElement(this._state);
  };

  #setElementPosition = () => {
    this.element.scrollTo(this._state.position.x, this._state.position.y);
  };

  #savePosition = () => {
    this._state.position = { x: 0, y: this.element.scrollTop };
  };

  static parseMovieToState = (movie) => ({
    ...movie,
    position: { x: 0, y: 0 },
    emotion: null,
  });


  static parseStateToMovie = (state) => {
    const movie = { ...state };

    delete movie.position;
    delete movie.emotion;

    return movie;
  };
}
