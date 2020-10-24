import { mockTodos, Todo, TodoStatus } from '@gus/todo';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  private todos: Todo[] = [...mockTodos];
  private ids = [];

  public getTodos(): Todo[] {
    return this.todos;
  }

  public addTodo(status: TodoStatus) {
    const id = this.createNewId();
    this.todos.push({
      id,
      status,
    });
    return { id, status };
  }

  private createNewId() {
    let id: string = null;
    do {
      id = `${Math.floor(Math.random() * 10000)}`;
    } while (this.ids.indexOf(id) !== -1);
    this.ids.push(id);
    return id;
  }

  public updateTodo(id: string, status: TodoStatus) {
    const todo = this.todos.find((item) => item.id === id);
    if (todo) {
      todo.status = status;
      return todo;
    } else {
      throw new NotFoundException();
    }
  }

  public deleteTodo(id: string) {
    this.todos = this.todos.filter((item) => item.id !== id);
    this.ids = this.ids.filter((item) => item !== id);
  }
}
