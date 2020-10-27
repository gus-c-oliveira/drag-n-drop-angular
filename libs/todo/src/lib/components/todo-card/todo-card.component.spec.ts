import { ComponentFixture, TestBed } from '@angular/core/testing';

import { mockTodos } from '../../model';
import {
  getElementBySelector,
  getElementTextContentBySelector,
} from '../../testing/testing';
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
    const info = getElementTextContentBySelector(fixture, '.todo__info');
    expect(info).toEqual(`#${mockTodos[0].id}: ${mockTodos[0].title}`);
  });

  it('should display the advance trigger', () => {
    const advanceTrigger = getElementBySelector(fixture, '.todo__advance');
    expect(advanceTrigger).toBeTruthy();
  });

  it('should emit advance event when clicking the advance trigger', () => {
    spyOn(component.reduce, 'emit');
    const advanceTrigger = getElementBySelector(fixture, '.todo__advance');
    advanceTrigger.click();
    expect(component.reduce.emit).toHaveBeenCalled();
    expect(component.reduce.emit).toHaveBeenCalledWith({
      todo: mockTodos[0],
      type: 'advance',
    });
  });

  it('should display the delete trigger', () => {
    const deleteTrigger = getElementBySelector(fixture, '.todo__delete');
    expect(deleteTrigger).toBeTruthy();
  });

  it('should emit delete event when clicking the delete trigger', () => {
    spyOn(component.reduce, 'emit');
    const deleteTrigger = getElementBySelector(fixture, '.todo__delete');
    deleteTrigger.click();
    expect(component.reduce.emit).toHaveBeenCalled();
    expect(component.reduce.emit).toHaveBeenCalledWith({
      todo: mockTodos[0],
      type: 'delete',
    });
  });
});
