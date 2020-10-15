import { mockTodos, TodoStatus } from '@gus/todo';
import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();
    service = app.get<AppService>(AppService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should return array of todos', () => {
      expect(service.getTodos()).toEqual([...mockTodos]);
    });
  });

  describe('addTodo', () => {
    it('should create a todo', () => {
      service.addTodo(TodoStatus.WIP);
      const todos = service.getTodos();
      const newTodo = todos[todos.length - 1];
      expect(newTodo).toBeTruthy();
      expect(newTodo.status).toEqual(TodoStatus.WIP);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo with the new status', () => {
      service.addTodo(TodoStatus.WIP);
      let todos = service.getTodos();
      const newTodoId = todos[todos.length - 1].id;
      service.updateTodo(newTodoId, TodoStatus.REVIEW);
      todos = service.getTodos();
      const updatedTodo = todos[todos.length - 1];
      expect(updatedTodo.status).toEqual(TodoStatus.REVIEW);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', () => {
      const originalLength = service.getTodos().length;
      service.addTodo(TodoStatus.WIP);
      const todos = service.getTodos();
      service.deleteTodo(todos[todos.length - 1].id);
      expect(service.getTodos().length).toEqual(originalLength);
    });
  });
});
