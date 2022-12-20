import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ProfileView from './view/profile-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';


const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const bodyElement = document.body;
const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement, bodyElement });

render(new ProfileView(), headerElement);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);

boardPresenter.init();
