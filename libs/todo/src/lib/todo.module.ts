import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TodoCardComponent } from './components/index';

@NgModule({
  imports: [CommonModule],
  declarations: [TodoCardComponent],
  exports: [TodoCardComponent],
})
export class TodoModule {}
