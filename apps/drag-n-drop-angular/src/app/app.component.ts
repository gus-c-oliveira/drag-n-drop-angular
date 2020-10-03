import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Todo } from './todo';

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
    this.http.post('/api/addTodo', {}).subscribe(() => this.fetchTodos());
  }
}
