import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ProfileView from './view/profile-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';


const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const bodyElement = document.body;
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement, bodyElement, moviesModel, commentsModel });


render(new ProfileView(), headerElement);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);

boardPresenter.init();
