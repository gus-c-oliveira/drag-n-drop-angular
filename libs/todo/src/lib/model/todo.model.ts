export enum TodoStatus {
  TODO = 'TODO',
  WIP = 'WIP',
  REVIEW = 'REVIEW',
  COMPLETE = 'COMPLETE',
}

export const getNextStatus = (status: TodoStatus): TodoStatus => {
  switch (status) {
    case TodoStatus.TODO:
      return TodoStatus.WIP;
    case TodoStatus.WIP:
      return TodoStatus.REVIEW;
    case TodoStatus.REVIEW:
      return TodoStatus.COMPLETE;
    default:
      return status;
  }
};

export interface Todo {
  id: string;
  status: TodoStatus;
}

export interface TodoEvent {
  id: string;
  type: string;
  payload?: any;
}
