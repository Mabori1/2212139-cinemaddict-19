import dayjs from 'dayjs';


const sortDate = (cardA, cardB) => dayjs(cardA.filmInfo.release.date)
  .diff(dayjs(cardB.filmInfo.release.date));

const sortRating = (cardA, cardB) => cardB.filmInfo.totalRating - cardA.filmInfo.totalRating;

export { sortDate, sortRating };
