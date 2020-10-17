import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { emit } from 'process';

import { mockTodos, TodoStatus } from '../../model/index';
import { TodoCardComponent } from './todo-card.component';

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    component.todo = mockTodos[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todo info', () => {
    const info = fixture.debugElement
      .query(By.css('.todo__info'))
      .nativeElement.textContent.trim();
    expect(info).toEqual('#0 - Status: TODO');
  });

  it('should display the update trigger', () => {
    const updateTrigger = fixture.debugElement.query(By.css('.update'))
      .nativeElement;
    expect(updateTrigger).toBeTruthy();
  });

  it('should emit update event when clicking the update trigger', () => {
    spyOn(component.reduce, 'emit');
    const updateTrigger = fixture.debugElement.query(By.css('.update'))
      .nativeElement;
    updateTrigger.click();
    expect(component.reduce.emit).toHaveBeenCalled();
    expect(component.reduce.emit).toHaveBeenCalledWith({
      id: '0',
      type: 'update',
      payload: TodoStatus.TODO,
    });
  });

  it('should display the delete trigger', () => {
    const deleteTrigger = fixture.debugElement.query(By.css('.delete'))
      .nativeElement;
    expect(deleteTrigger).toBeTruthy();
  });

  it('should emit delete event when clicking the delete trigger', () => {
    spyOn(component.reduce, 'emit');
    const deleteTrigger = fixture.debugElement.query(By.css('.delete'))
      .nativeElement;
    deleteTrigger.click();
    expect(component.reduce.emit).toHaveBeenCalled();
    expect(component.reduce.emit).toHaveBeenCalledWith({
      id: '0',
      type: 'delete',
    });
  });
});
