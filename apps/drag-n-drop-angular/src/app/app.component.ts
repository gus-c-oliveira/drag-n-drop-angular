import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  GlobalPositionStrategy,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import {
  getAllTodoStatus,
  getNextStatus,
  Todo,
  TodoEvent,
  TodoFormComponent,
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

  private overlayRef: OverlayRef;

  public constructor(
    private todoService: TodoService,
    private overlay: Overlay
  ) {
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
    this.openTodoForm();
  }

  private openTodoForm() {
    const positionStrategy = this.getPositionStrategy();
    this.overlayRef = this.getOverlayRef(positionStrategy);
    this.configureOverlayDisposeOnBackdropClick();
    const formComponent = this.getFormInOverlay();
    this.listenToFormData(formComponent);
  }

  private getPositionStrategy() {
    return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }

  private getOverlayRef(positionStrategy: GlobalPositionStrategy) {
    return this.overlay.create({
      width: '50%',
      hasBackdrop: true,
      disposeOnNavigation: true,
      backdropClass: ['form-overlay', 'cdk-overlay-dark-backdrop'],
      positionStrategy,
    });
  }

  private configureOverlayDisposeOnBackdropClick() {
    this.overlayRef.backdropClick().subscribe((_) => this.overlayRef.dispose());
  }

  private getFormInOverlay() {
    const portal = new ComponentPortal(TodoFormComponent);
    const formComponent = this.overlayRef.attach<TodoFormComponent>(portal)
      .instance;
    formComponent.overlayRef = this.overlayRef;
    return formComponent;
  }

  private listenToFormData(formComponent: TodoFormComponent) {
    formComponent.data.pipe(take(1)).subscribe((data) => {
      if (!data) {
        return;
      }
      this.todoService
        .createTodo(data.title, data.status)
        .pipe(take(1))
        .subscribe(
          (response) => {
            this.addTodoToStatus(response as Todo);
          },
          (error) => console.warn('Error creating todo, please try again!')
        );
    });
  }

  private addTodoToStatus(todo: Todo, status: TodoStatus = null) {
    if (!status) {
      status = todo.status;
    }
    this.todosByStatus[status].push(todo);
  }

  public handleReduce(event: TodoEvent) {
    if (this[`${event.type}Todo`]) {
      this[`${event.type}Todo`](event.todo);
    } else {
      console.warn('Event not handled by this component!');
    }
  }

  private advanceTodo(todo: Todo) {
    this.removeTodoFromStatus(todo);
    this.todoService
      .updateTodo(todo.id, getNextStatus(todo.status))
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.addTodoToStatus(response as Todo);
        },
        (error) => {
          this.addTodoToStatus(todo);
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

  private deleteTodo(todo: Todo) {
    this.todoService
      .deleteTodo(todo.id)
      .pipe(take(1))
      .subscribe(
        (_) => {
          this.removeTodoFromStatus(todo);
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
    const todo = this.todosByStatus[previousStatus].find(
      (item) => item.id === id
    );
    this.removeTodoFromStatus(todo, previousStatus);
    this.addTodoToStatus({ ...todo, status });
    this.todoService
      .updateTodo(id, status)
      .pipe(take(1))
      .subscribe(
        (response) => {},
        (error) => {
          this.removeTodoFromStatus({ ...todo, status });
          this.addTodoToStatus(todo, previousStatus);
          console.warn('Error updating todo, please try again!');
        }
      );
  }
}
