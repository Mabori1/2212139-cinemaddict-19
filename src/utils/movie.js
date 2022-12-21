
const getCommentsMovie = (comments, movieIds) => comments.filter((item) => movieIds.some((movieId) => movieId === item.id));


export { getCommentsMovie };
