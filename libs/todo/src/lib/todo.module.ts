import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TodoCardComponent, TodoFormComponent } from './components/index';
import { TodoService } from './service/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    OverlayModule,
    ReactiveFormsModule,
  ],
  declarations: [TodoCardComponent, TodoFormComponent],
  exports: [TodoCardComponent],
  providers: [TodoService],
})
export class TodoModule {}
