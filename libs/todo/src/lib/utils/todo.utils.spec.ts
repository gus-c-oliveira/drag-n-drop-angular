import { TodoStatus } from '../model/index';
import { getAllTodoStatus, getNextStatus } from './todo.utils';

describe('getAllTodoStatus', () => {
  it('should return an array containing all possible TODO status', () => {
    expect(getAllTodoStatus()).toEqual([
      TodoStatus.TODO,
      TodoStatus.WIP,
      TodoStatus.REVIEW,
      TodoStatus.DONE,
    ]);
  });
});

describe('getNextStatus', () => {
  it('should return the next todo status', () => {
    const currentStatus: TodoStatus[] = [
      TodoStatus.TODO,
      TodoStatus.WIP,
      TodoStatus.REVIEW,
      TodoStatus.DONE,
    ];
    const nextStatus: TodoStatus[] = [
      TodoStatus.WIP,
      TodoStatus.REVIEW,
      TodoStatus.DONE,
      TodoStatus.DONE,
    ];
    currentStatus.forEach((status, index) => {
      expect(getNextStatus(status)).toEqual(nextStatus[index]);
    });
  });
});
