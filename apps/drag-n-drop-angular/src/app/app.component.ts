import { Component } from '@angular/core';

import { Todo, mockTodos } from './todo/index';

@Component({
  selector: 'gus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public todos: Todo[] = mockTodos;
}
