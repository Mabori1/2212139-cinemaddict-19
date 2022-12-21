import dayjs from 'dayjs';
import { require } from 'dayjs';


const DATE_FORMAT = 'D MMMM';

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomArrayNumbers = (min, max = 5) => {
  const count = getRandomInteger(min, max);
  const arr = new Set();
  for (let i = 0; i < count; i++) {
    arr.add(getRandomInteger(1, 10));
  }
  return Array.from(arr);
};

const getRandomDate = () => dayjs()
  .add(getRandomInteger(-2, -20), 'year')
  .add(getRandomInteger(-1, -30), 'day')
  .add(getRandomInteger(-1, -23), 'hour').format('YYYY');

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

const getRandomFloat = (min, max) => {
  const num = Math.random() * (max - min) + min;
  return num.toFixed(1);
};

export {
  getRandomArrayElement, humanizeTaskDueDate, isTaskExpired, isTaskRepeating,
  getRandomInteger, getRandomArrayNumbers, getRandomDate, getRandomFloat, getDurationTime
};
