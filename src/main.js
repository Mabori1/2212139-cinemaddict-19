import FilterView from './view/filter-view.js';
import ProfileView from './view/profile-view.js';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import { generateFilter } from './moсk/filter.js';


const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const bodyElement = document.body;
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const filters = generateFilter(moviesModel.movies);
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  bodyElement,
  moviesModel,
  commentsModel
});

render(new ProfileView(), headerElement);
render(new FilterView({ filters }), siteMainElement);
render(new FooterStatisticView(moviesModel.movies.length), footerStatisticsElement);

boardPresenter.init();
