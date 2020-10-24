import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Todo, TodoStatus } from '../model/index';
import { getNextStatus } from '../utils/index';

export const baseURL = '/api/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public constructor(private http: HttpClient) {}

  public getTodos() {
    return this.http.get<Todo[]>(baseURL);
  }

  public createTodo() {
    return this.http.post(baseURL, { status: TodoStatus.TODO });
  }

  public updateTodo(id: string, status: TodoStatus) {
    return this.http.put(baseURL, { id, status });
  }

  public deleteTodo(id: string) {
    return this.http.delete(`${baseURL}/${id}`);
  }
}
