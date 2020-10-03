import { Injectable } from '@nestjs/common';

import { mockTodos, Todo } from './todo';

@Injectable()
export class AppService {
  public todos: Todo[] = [...mockTodos];

  public getTodos(): Todo[] {
    return this.todos;
  }

  public addTodo() {
    this.todos.push({
      title: `Todo ${this.todos.length + 1}`,
    });
  }
}
