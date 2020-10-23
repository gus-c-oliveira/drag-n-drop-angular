import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { TodoCardComponent } from './components/index';
import { TodoService } from './service/index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [TodoCardComponent],
  exports: [TodoCardComponent],
  providers: [TodoService],
})
export class TodoModule {}
