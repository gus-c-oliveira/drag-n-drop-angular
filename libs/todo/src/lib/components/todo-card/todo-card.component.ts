import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Todo, TodoEvent } from '../../model/index';

@Component({
  selector: 'gus-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input() public todo: Todo = null;
  @Output() public reduce = new EventEmitter<TodoEvent>();

  public handleReduce(event: TodoEvent) {
    this.reduce.emit(event);
  }
}
