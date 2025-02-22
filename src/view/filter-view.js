import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(filters) {


  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filters[0].count}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filters[1].count}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filters[2].count}</span></a>
    </nav>`
  );
}

export default class FilterView extends AbstractView {

  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

}
