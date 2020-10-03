import { mockTodos, Todo } from '@gus/todo';
import { Injectable } from '@nestjs/common';

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
