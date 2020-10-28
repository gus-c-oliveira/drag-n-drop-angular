import { OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TodoStatus } from '../../model';
import { getAllTodoStatus } from '../../utils';
import { TodoFormData } from './todo-form.model';

@Component({
  selector: 'gus-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Input() public overlayRef: OverlayRef = null;
  @Output() public data = new EventEmitter<TodoFormData>();

  public allTodoStatus = getAllTodoStatus();
  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
  public enableOverlayWarning = true;

  public emit(data: TodoFormData | null) {
    if (data && !this.form.valid) {
      return;
    }
    this.data.emit(data);
    this.close();
  }

  private close() {
    const overlay = this.getOverlayElement();
    if (!overlay) {
      if (this.enableOverlayWarning) {
        console.warn('No overlay found!');
      }
      return;
    }
    overlay.click();
  }

  private getOverlayElement() {
    return document.getElementsByClassName('form-overlay')[0] as HTMLElement;
  }
}
