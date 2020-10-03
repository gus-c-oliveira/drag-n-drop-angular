import { mockTodos } from '@gus/todo';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getTodos', () => {
    it('should return list of mock todos', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getTodos()).toEqual(mockTodos);
    });
  });

  describe('addTodo', () => {
    it('should create a new todo item', () => {
      const appController = app.get<AppController>(AppController);
      appController.addTodo();
      expect(appController.getTodos()).toEqual([
        ...mockTodos,
        { title: `Todo ${mockTodos.length + 1}` },
      ]);
    });
  });
});
