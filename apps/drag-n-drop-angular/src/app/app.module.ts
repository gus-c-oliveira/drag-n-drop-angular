import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TODO_ICON_SRC, TodoModule } from '@gus/todo';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular
    BrowserAnimationsModule,
    BrowserModule,
    DragDropModule,
    OverlayModule,

    // Lib
    TodoModule,
  ],
  providers: [{ provide: TODO_ICON_SRC, useValue: 'assets/img/todo/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
