import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { getNextStatus, Todo, TodoEvent, TodoStatus } from '@gus/todo';

@Component({
  selector: 'gus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public todos: Todo[] = [];

  public constructor(private http: HttpClient) {
    this.fetchTodos();
  }

  private fetchTodos() {
    this.http
      .get<Todo[]>('/api/todos')
      .subscribe((todos) => (this.todos = todos));
  }

  public addTodo() {
    this.http
      .post('/api/todos', { status: TodoStatus.TODO })
      .subscribe(() => this.fetchTodos());
  }

  public handleReduce(event: TodoEvent) {
    if (this[`${event.type}Todo`]) {
      this[`${event.type}Todo`](event.id, event.payload);
    } else {
      console.warn('Event not handled by this component!');
    }
  }

  private updateTodo(id: string, status: TodoStatus) {
    this.http
      .put('/api/todos', { id, status: getNextStatus(status) })
      .subscribe(() => this.fetchTodos());
  }

  private deleteTodo(id: string) {
    this.http.delete(`/api/todos/${id}`).subscribe(() => this.fetchTodos());
  }
}
