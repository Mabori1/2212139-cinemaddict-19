import { nanoid } from 'nanoid';
import { TITLES, POSTERS, NAMES, COUNTRIES, GENRES, DESCRIPTIONS, AGES } from '../const.js';
import {
  getRandomArrayElement, getRandomInteger, getRandomArrayNumbers,
  getRandomFloat
} from '../utils/common.js';
import { getRandomDate, getDurationTime } from '../utils/data.js';


const getMovie = () => {

  const movie = {
    'id': nanoid(),
    'comments': getRandomArrayNumbers(2, 8),
    'filmInfo': {
      'title': getRandomArrayElement(TITLES),
      'alternativeTitle': getRandomArrayElement(TITLES),
      'totalRating': getRandomFloat(3, 10),
      'poster': `./images/posters/${getRandomArrayElement(POSTERS)}`,
      'ageRating': getRandomArrayElement(AGES),
      'director': getRandomArrayElement(NAMES),
      'writers': NAMES.slice(1, getRandomInteger(1, 3)),
      'actors': NAMES.slice(1, getRandomInteger(1, 3)),
      'release': {
        'date': getRandomDate(),
        'releaseCountry': getRandomArrayElement(COUNTRIES)
      },
      'duration': getDurationTime(),
      'genre': GENRES.slice(1, getRandomInteger(1, 4)),
      'description': getRandomArrayElement(DESCRIPTIONS)
    },
    'userDetails': {
      'watchlist': Boolean(getRandomInteger(0, 1)),
      'alreadyWatched': Boolean(getRandomInteger(0, 1)),
      'watchingDate': getRandomDate(),
      'favorite': Boolean(getRandomInteger(0, 1))
    }
  };
  return movie;
};

export { getMovie };
