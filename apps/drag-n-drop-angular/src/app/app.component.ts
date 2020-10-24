import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import {
  getAllTodoStatus,
  Todo,
  TodoEvent,
  TodoService,
  TodoStatus,
} from '@gus/todo';
import { take } from 'rxjs/operators';

@Component({
  selector: 'gus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public allTodoStatus = getAllTodoStatus();
  public statusListConnections: { [status: string]: string[] } = {};
  public todosByStatus: { [status: string]: Todo[] } = {};

  public constructor(private todoService: TodoService) {
    this.initTodosByStatus();
    this.initStatusListConnections();
    this.fetchTodos();
  }

  private initTodosByStatus() {
    this.allTodoStatus.forEach((status) => {
      this.todosByStatus[status] = [];
    });
  }

  private initStatusListConnections() {
    this.allTodoStatus.forEach((status) => {
      this.statusListConnections[status] = this.allTodoStatus.filter(
        (item) => item !== status
      );
    });
  }

  private fetchTodos() {
    this.todoService
      .getTodos()
      .pipe(take(1))
      .subscribe(
        (todos) => this.populateTodosByStatus(todos),
        (error) => {
          console.warn('Error loading todos, please refresh page!');
        }
      );
  }

  private populateTodosByStatus(todos: Todo[]) {
    todos.forEach((item) => {
      this.todosByStatus[item.status].push(item);
    });
  }

  public addTodo() {
    this.todoService
      .createTodo()
      .pipe(take(1))
      .subscribe(
        (response) => {
          const newTodo = response as Todo;
          this.todosByStatus[newTodo.status].push(newTodo);
        },
        (error) => console.warn('Error creating todo, please try again!')
      );
  }

  public handleReduce(event: TodoEvent) {
    if (this[`${event.type}Todo`]) {
      this[`${event.type}Todo`](event.id, event.payload);
    } else {
      console.warn('Event not handled by this component!');
    }
  }

  private updateTodo(id: string, status: TodoStatus) {
    this.removeTodoFromStatus({ id, status }, status);
    this.todoService
      .updateTodoToNextStatus(id, status)
      .pipe(take(1))
      .subscribe(
        (response) => {
          const updatedTodo = response as Todo;
          this.addTodoToStatus(updatedTodo, updatedTodo.status);
        },
        (error) => {
          this.addTodoToStatus({ id, status }, status);
          console.warn('Error updating todo, please try again!');
        }
      );
  }

  private removeTodoFromStatus(todo: Todo, status: TodoStatus = null) {
    if (!status) {
      status = todo.status;
    }
    this.todosByStatus[status] = this.todosByStatus[status].filter(
      (item) => item.id !== todo.id
    );
  }

  private addTodoToStatus(todo: Todo, status: TodoStatus) {
    this.todosByStatus[status].push(todo);
  }

  private deleteTodo(id: string, status: TodoStatus) {
    this.todoService
      .deleteTodo(id)
      .pipe(take(1))
      .subscribe(
        (_) => {
          this.removeTodoFromStatus({ id, status });
        },
        (error) => console.warn('Error deleting todo, please try again!')
      );
  }

  public itemDropped(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const id = event.item.element.nativeElement.id;
    const status = event.container.id as TodoStatus;
    const previousStatus = event.previousContainer.id as TodoStatus;
    this.removeTodoFromStatus({ id, status }, previousStatus);
    this.todoService
      .updateTodo(id, status)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.addTodoToStatus(response as Todo, status);
        },
        (error) => {
          this.addTodoToStatus({ id, status }, previousStatus);
          console.warn('Error updating todo, please try again!');
        }
      );
  }
}
