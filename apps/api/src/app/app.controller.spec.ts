import { mockTodos, TodoStatus } from '@gus/todo';
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
      expect(appController.getTodos()).toEqual([...mockTodos]);
    });
  });

  describe('addTodo', () => {
    it('should create a todo', () => {
      appController.addTodo({ status: TodoStatus.WIP });
      const todos = appController.getTodos();
      expect(todos[todos.length - 1].status).toEqual(TodoStatus.WIP);
    });
  });

  describe('updateTodo', () => {
    it('should update todo with new status', () => {
      appController.addTodo({ status: TodoStatus.WIP });
      let todos = appController.getTodos();
      const newTodoId = todos[todos.length - 1].id;
      appController.updateTodo({ id: newTodoId, status: TodoStatus.REVIEW });
      todos = appController.getTodos();
      const updatedTodo = todos[todos.length - 1];
      expect(updatedTodo.status).toEqual(TodoStatus.REVIEW);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', () => {
      const originalLength = appController.getTodos().length;
      appController.addTodo({ status: TodoStatus.WIP });
      const todos = appController.getTodos();
      appController.deleteTodo({ id: todos[todos.length - 1].id });
      expect(appController.getTodos().length).toEqual(originalLength);
    });
  });
});
