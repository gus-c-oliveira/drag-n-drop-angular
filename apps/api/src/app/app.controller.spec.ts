import { TodoStatus } from '@gus/todo';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  it('should create', () => {
    expect(appController).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should return array of todos', () => {
      expect(appController.getTodos()).toEqual([]);
    });
  });

  describe('addTodo', () => {
    it('should create a todo', () => {
      appController.addTodo({ status: TodoStatus.WIP });
      const newTodo = appController.getTodos()[0];
      expect(newTodo.status).toEqual(TodoStatus.WIP);
    });
  });

  describe('updateTodo', () => {
    it('should update todo with new status', () => {
      appController.addTodo({ status: TodoStatus.WIP });
      const newTodoId = appController.getTodos()[0].id;
      appController.updateTodo({ id: newTodoId, status: TodoStatus.REVIEW });
      const updatedTodo = appController.getTodos()[0];
      expect(updatedTodo.status).toEqual(TodoStatus.REVIEW);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', () => {
      appController.addTodo({ status: TodoStatus.WIP });
      appController.addTodo({ status: TodoStatus.REVIEW });
      const todos = appController.getTodos();
      appController.deleteTodo({ id: todos[0].id });
      expect(appController.getTodos().length).toEqual(1);
    });
  });
});
