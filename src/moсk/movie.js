import { TITLES, POSTERS, NAMES, COUNTRYS, GENRES, DESCRIPTIONS } from '../const.js';
import {
  getRandomArrayElement, getRandomInteger, getRandomArrayNumbers,
  getRandomFloat, getRandomDate
} from '../utils/utils';


const movie = {
  'id': '0',
  'comments': getRandomArrayNumbers(1, 4),
  'film_info': {
    'title': getRandomArrayElement(TITLES),
    'alternative_title': getRandomArrayElement(TITLES),
    'total_rating': getRandomFloat(3, 10),
    'poster': `images/posters/${getRandomArrayElement(POSTERS)}`,
    'age_rating': getRandomInteger(0, 10),
    'director': getRandomArrayElement(NAMES),
    'writers': [getRandomArrayElement(NAMES)],
    'actors': [getRandomArrayElement(NAMES), getRandomArrayElement(NAMES)],
    'release': {
      'date': getRandomDate(),
      'release_country': getRandomArrayElement(COUNTRYS)
    },
    'duration': getRandomInteger(20, 100),
    'genre': GENRES.slice(0, getRandomInteger(0, 3)),
    'description': getRandomArrayElement(DESCRIPTIONS)
  },
  'user_details': {
    'watchlist': Boolean(getRandomArrayElement(0, 1)),
    'already_watched': Boolean(getRandomArrayElement(0, 1)),
    'watching_date': getRandomDate(),
    'favorite': Boolean(getRandomArrayElement(0, 1))
  }
};

export { movie };
