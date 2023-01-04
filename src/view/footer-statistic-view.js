import { createElement } from '../render.js';

function createFooterStatisticTemplate(count) {
  return (
    `<p>${count} movies inside</p>`
  );
}

export default class FooterStatisticView {

  #element = null;
  #count = null;

  constructor(count) {
    this.#count = count;
  }

  get template() {
    return createFooterStatisticTemplate(this.#count);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
