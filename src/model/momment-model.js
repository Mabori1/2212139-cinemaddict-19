import { comment } from '../moсk/comment';

const COMMENT_COUNT = 10;

export default class TasksModel {
  comments = Array.from({ length: COMMENT_COUNT }, comment);

  getTasks() {
    return this.comments;
  }
}
