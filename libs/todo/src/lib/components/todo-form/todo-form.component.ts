import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { getAllTodoStatus } from '../../utils';

@Component({
  selector: 'gus-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Input() public overlayRef: OverlayRef = null;

  public allTodoStatus = getAllTodoStatus();
  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
}
