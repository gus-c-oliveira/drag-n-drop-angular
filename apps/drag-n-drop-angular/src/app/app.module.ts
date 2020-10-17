import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TodoModule } from '@gus/todo';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, TodoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
