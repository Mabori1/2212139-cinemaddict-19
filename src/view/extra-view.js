import AbstractView from '../framework/view/abstract-view.js';


function createExtraTemplate(extraType) {


  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">${extraType}</h2>

</section>`;
}
export default class ExtraFilmView extends AbstractView {

  #extraType = null;

  constructor(extraType) {
    super();
    this.#extraType = extraType;
  }

  get template() {
    return createExtraTemplate(this.#extraType);
  }

}
