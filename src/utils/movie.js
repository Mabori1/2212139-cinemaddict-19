
const getCommentsMovie = (comments, movieIds) => comments.filter((item) => movieIds.includes(item.id));


export { getCommentsMovie };
