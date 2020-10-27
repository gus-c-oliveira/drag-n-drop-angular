export enum TodoStatus {
  TODO = 'TODO',
  WIP = 'WIP',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export interface Todo {
  id: string;
  status: TodoStatus;
  title: string;
}

export interface TodoEvent {
  todo: Todo;
  type: string;
}
