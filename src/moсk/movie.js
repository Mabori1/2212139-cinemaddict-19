import { TITLES, POSTERS, NAMES, COUNTRIES, GENRES, DESCRIPTIONS, AGES } from '../const.js';
import {
  getRandomArrayElement, getRandomInteger, getRandomArrayNumbers,
  getRandomFloat, getRandomDate, getDurationTime
} from '../utils/utils';


const getMovie = (index) => {

  const movie = {
    'id': index,
    'comments': getRandomArrayNumbers(1, 4),
    'film_info': {
      'title': getRandomArrayElement(TITLES),
      'alternative_title': getRandomArrayElement(TITLES),
      'total_rating': getRandomFloat(3, 10),
      'poster': `./images/posters/${getRandomArrayElement(POSTERS)}`,
      'age_rating': getRandomArrayElement(AGES),
      'director': getRandomArrayElement(NAMES),
      'writers': NAMES.slice(1, getRandomInteger(1, 3)),
      'actors': NAMES.slice(1, getRandomInteger(1, 3)),
      'release': {
        'date': getRandomDate(),
        'release_country': getRandomArrayElement(COUNTRIES)
      },
      'duration': getDurationTime(),
      'genre': getRandomArrayElement(GENRES),
      'description': getRandomArrayElement(DESCRIPTIONS)
    },
    'user_details': {
      'watchlist': Boolean(getRandomInteger(0, 1)),
      'already_watched': Boolean(getRandomInteger(0, 1)),
      'watching_date': getRandomDate(),
      'favorite': Boolean(getRandomInteger(0, 1))
    }
  };
  return movie;
};

export { getMovie };
