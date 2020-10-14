import { TodoStatus } from '@gus/todo';
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
      expect(service.getTodos()).toEqual([]);
    });
  });

  describe('addTodo', () => {
    it('should create a todo', () => {
      service.addTodo(TodoStatus.WIP);
      const newTodo = service.getTodos()[0];
      expect(newTodo).toBeTruthy();
      expect(newTodo.status).toEqual(TodoStatus.WIP);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo with the new status', () => {
      service.addTodo(TodoStatus.WIP);
      const newTodoId = service.getTodos()[0].id;
      service.updateTodo(newTodoId, TodoStatus.REVIEW);
      const updatedTodo = service.getTodos()[0];
      expect(updatedTodo.status).toEqual(TodoStatus.REVIEW);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', () => {
      service.addTodo(TodoStatus.WIP);
      service.addTodo(TodoStatus.REVIEW);
      const todos = service.getTodos();
      service.deleteTodo(todos[0].id);
      expect(service.getTodos().length).toEqual(1);
    });
  });
});
