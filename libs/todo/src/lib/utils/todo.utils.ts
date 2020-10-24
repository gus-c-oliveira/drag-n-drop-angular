import { TodoStatus } from '../model/index';

export const getAllTodoStatus = () => {
  const possibleStatus = [];
  for (const status of Object.keys(TodoStatus)) {
    possibleStatus.push(TodoStatus[status]);
  }
  return possibleStatus;
};

export const getNextStatus = (status: TodoStatus): TodoStatus => {
  switch (status) {
    case TodoStatus.TODO:
      return TodoStatus.WIP;
    case TodoStatus.WIP:
      return TodoStatus.REVIEW;
    case TodoStatus.REVIEW:
      return TodoStatus.DONE;
    default:
      return status;
  }
};
