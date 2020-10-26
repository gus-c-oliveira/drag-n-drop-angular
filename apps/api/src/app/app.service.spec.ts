import { mockTodos, TodoStatus } from '@gus/todo';
import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let app: TestingModule;
  const testItem = { title: 'Test item', status: TodoStatus.TODO };

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
      service.addTodo(testItem.title, testItem.status);
      const todos = service.getTodos();
      const newTodo = todos[todos.length - 1];
      expect(newTodo).toBeTruthy();
      expect(newTodo.status).toEqual(testItem.status);
      expect(newTodo.title).toEqual(testItem.title);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo with the new status', () => {
      service.addTodo(testItem.title, testItem.status);
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
      service.addTodo(testItem.title, testItem.status);
      const todos = service.getTodos();
      service.deleteTodo(todos[todos.length - 1].id);
      expect(service.getTodos().length).toEqual(originalLength);
    });
  });
});
