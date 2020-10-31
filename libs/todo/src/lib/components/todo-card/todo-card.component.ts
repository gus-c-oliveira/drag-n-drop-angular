import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';

import { Todo, TodoEvent } from '../../model/index';
import { TODO_ICON_SRC } from '../../tokens';

@Component({
  selector: 'gus-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input() public todo: Todo = null;
  @Output() public reduce = new EventEmitter<TodoEvent>();

  public constructor(@Inject(TODO_ICON_SRC) public todoIconSrc: string) {}

  public handleReduce(event: TodoEvent) {
    this.reduce.emit(event);
  }
}
