import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { getNextStatus, mockTodos, TodoStatus } from '../model/index';
import { baseURL, TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TodoService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should retrieve an array of todo items using a GET request', (done) => {
      service.getTodos().subscribe((data) => {
        expect(data.length).toEqual(1);
        data.forEach((item, index) => {
          expect(item).toEqual(mockTodos[index]);
        });
        done();
      });

      const req = http.expectOne(baseURL);
      expect(req.request.method).toEqual('GET');

      req.flush(mockTodos);
    });
  });

  describe('createTodo', () => {
    it('should send a POST request to create a new todo item', (done) => {
      service.createTodo().subscribe((_) => done());

      const req = http.expectOne(baseURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ status: TodoStatus.TODO });

      req.flush({});
    });
  });

  describe('updateTodo', () => {
    it('should send a PUT request to update the status of a todo item', (done) => {
      const id = '5';
      const status = TodoStatus.WIP;
      service.updateTodo(id, status).subscribe((_) => done());

      const req = http.expectOne(baseURL);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual({ id, status });

      req.flush({});
    });
  });

  describe('updateTodoToNextStatus', () => {
    it('should send a PUT request to update a todo item to the next status', (done) => {
      const id = '7';
      const currentStatus: TodoStatus = TodoStatus.WIP;
      service
        .updateTodoToNextStatus(id, currentStatus)
        .subscribe((_) => done());

      const req = http.expectOne(baseURL);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual({
        id,
        status: getNextStatus(currentStatus),
      });

      req.flush({});
    });
  });

  describe('deleteTodo', () => {
    it('should send a DELETE request to delete a todo item', (done) => {
      const id = '3';
      service.deleteTodo(id).subscribe((_) => done());

      const req = http.expectOne(`${baseURL}/${id}`);
      expect(req.request.method).toEqual('DELETE');

      req.flush({});
    });
  });

  afterEach(() => {
    http.verify();
  });
});
