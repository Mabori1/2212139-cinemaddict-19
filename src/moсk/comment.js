
import { COMMENTS, EMOTIONS, NAMES } from '../const.js';
import { getRandomArrayElement } from '../utils/common.js';
import { getRandomDateComment } from '../utils/data.js';


const getComment = (index) => {

  const comment = {
    'id': index,
    'author': getRandomArrayElement(NAMES),
    'comment': getRandomArrayElement(COMMENTS),
    'date': getRandomDateComment(),
    'emotion': getRandomArrayElement(EMOTIONS)
  };
  return comment;
};

export { getComment };
