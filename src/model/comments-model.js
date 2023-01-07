import { getComment } from '../moсk/comment';

const COMMENT_COUNT = 20;

export default class CommentsModel {

  #comments = Array.from({ length: COMMENT_COUNT }, (_, i) => getComment(i));

  get comments() {
    return this.#comments;
  }
}
