
import { COMMENTS, EMOTIONS, NAMES } from '../const.js';
import { getRandomArrayElement } from '../utils/common.js';
import { getRandomDate } from '../utils/data.js';


const getComment = (index) => {

  const comment = {
    'id': index,
    'author': getRandomArrayElement(NAMES),
    'comment': getRandomArrayElement(COMMENTS),
    'date': getRandomDate(),
    'emotion': getRandomArrayElement(EMOTIONS)
  };
  return comment;
};

export { getComment };
