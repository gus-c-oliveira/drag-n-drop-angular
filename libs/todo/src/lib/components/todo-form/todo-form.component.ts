import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gus-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {}
