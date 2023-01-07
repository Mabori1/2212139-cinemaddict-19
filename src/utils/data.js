import dayjs from 'dayjs';
import { require } from 'dayjs';
import { getRandomInteger } from './common';


const DATE_FORMAT = 'D MMMM';


const getRandomDate = () => dayjs()
  .add(getRandomInteger(-2, -20), 'year').format('YYYY');


const getRandomDateComment = () => dayjs()
  .add(getRandomInteger(-2, -20), 'year')
  .add(getRandomInteger(-1, -30), 'day')
  .add(getRandomInteger(-1, -23), 'hour')
  .add(getRandomInteger(-1, -23), 'minute').format('YYYY/MM/DD HH:mm');


const getDurationTime = () => {
  const duration = require('dayjs/plugin/duration');
  dayjs.extend(duration);

  const time = dayjs.duration(getRandomInteger(40, 180), 'minute');

  if (time.asHours() > 1) {
    return time.format('H[h] mm[m]');
  }

  return time.format('mm[m]');
};

const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const isTaskRepeating = (repeating) => Object.values(repeating).some(Boolean);


export {
  humanizeTaskDueDate, isTaskExpired, isTaskRepeating,
  getRandomDate, getDurationTime, getRandomDateComment
};
