import { getComment } from '../moсk/comment';

const COMMENT_COUNT = 10;

export default class CommentsModel {
  comments = Array.from({ length: COMMENT_COUNT }, (_, i) => getComment(i));

  get() {
    return this.comments;
  }
}
