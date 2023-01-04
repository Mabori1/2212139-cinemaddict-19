import { createElement } from '../render.js';

function createEmptyTemplate() {
  return (` <main class="main">

          <section class="films">
            <section class="films-list">
              <h2 class="films-list__title">There are no movies in our database</h2>
            </section>
          </section>
        </main>

        <footer class="footer">
          <section class="footer__logo logo logo--smaller">Cinemaddict</section>
          <section class="footer__statistics">
            <p>0 movies inside</p>
          </section>
        </footer>`
  );
}

export default class EmptyView {

  #element = null;

  get template() {
    return createEmptyTemplate();
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

