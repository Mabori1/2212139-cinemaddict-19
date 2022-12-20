import { COMMENTS, EMOTIONS, NAMES } from '../const.js';
import { getRandomArrayElement, getRandomInteger, getRandomDate } from '../utils/utils.js';

const comment = {
  'id': getRandomInteger(1, 10),
  'author': getRandomArrayElement(NAMES),
  'comment': getRandomArrayElement(COMMENTS),
  'date': getRandomDate(),
  'emotion': getRandomArrayElement(EMOTIONS)
};


export { comment };
