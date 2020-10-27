import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTodos() {
    return this.appService.getTodos();
  }

  @Post()
  addTodo(@Body() body) {
    return this.appService.addTodo(body.title, body.status);
  }

  @Put()
  updateTodo(@Body() body) {
    return this.appService.updateTodo(body.id, body.status);
  }

  @Delete(':id')
  deleteTodo(@Param() params) {
    return this.appService.deleteTodo(params.id);
  }
}
