import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArrayNumbers(min, max = 5) {
  const count = getRandomInteger(min, max);
  const arr = new Set();
  for (let i = 0; i < count; i++) {
    arr.add(getRandomInteger(1, 10));
  }
  return Array.from(arr);
}

const getRandomDate = () => dayjs()
  .add(getRandomInteger(1, 50), 'year')
  .add(getRandomInteger(1, 30), 'day')
  .add(getRandomInteger(1, 23), 'hour');

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function isTaskExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isTaskRepeating(repeating) {
  return Object.values(repeating).some(Boolean);
}

function getRandomFloat(min, max) {
  const num = Math.random() * (max - min) + min;
  return num.toFixed(1);
}

export {
  getRandomArrayElement, humanizeTaskDueDate, isTaskExpired, isTaskRepeating,
  getRandomInteger, getRandomArrayNumbers, getRandomDate, getRandomFloat
};
