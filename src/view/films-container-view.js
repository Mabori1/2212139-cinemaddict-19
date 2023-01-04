import AbstractView from '../framework/view/abstract-view.js';

function createFilmsContainerTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class FilmsContainerView extends AbstractView {

  get template() {
    return createFilmsContainerTemplate();
  }

}
