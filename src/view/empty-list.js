import AbstractView from '../framework/view/abstract-view.js';

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

export default class EmptyView extends AbstractView {

  get template() {
    return createEmptyTemplate();
  }

}

