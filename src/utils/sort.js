import dayjs from 'dayjs';


const sortDate = (cardA, cardB) => dayjs(cardA.filmInfo.release.date)
  .diff(dayjs(cardB.filmInfo.release.date));

const sortRating = (cardA, cardB) => cardB.filmInfo.totalRating - cardA.filmInfo.totalRating;

const sortComment = (cardA, cardB) => cardB.comments.length - cardA.comments.length;


export { sortDate, sortRating, sortComment };
