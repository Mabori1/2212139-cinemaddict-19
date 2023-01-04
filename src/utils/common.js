
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const getRandomArrayNumbers = (min, max = 5) => {
  const count = getRandomInteger(min, max);
  const arr = new Set();
  for (let i = 0; i < count; i++) {
    arr.add(getRandomInteger(1, 10));
  }
  return Array.from(arr);
};

const getRandomFloat = (min, max) => {
  const num = Math.random() * (max - min) + min;
  return num.toFixed(1);
};

export { getRandomArrayElement, getRandomInteger, getRandomArrayNumbers, getRandomFloat };
