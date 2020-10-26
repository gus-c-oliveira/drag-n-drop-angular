import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { getElementBySelector } from '../../testing/testing';

import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [
        MatInputModule,
        MatSelectModule,
        OverlayModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a form', () => {
    const form = getElementBySelector(fixture, 'form');
    expect(form).toBeTruthy();
  });

  it('should display an input field to enter task title', () => {
    const titleInput = getElementBySelector(fixture, 'input');
    expect(titleInput).toBeTruthy();
  });

  it('should display a selector element to select task status', () => {
    const selectorInput = getElementBySelector(fixture, 'mat-select');
    expect(selectorInput).toBeTruthy();
  });

  it('should display the save trigger', () => {
    const saveTrigger = getElementBySelector(fixture, '.action__save');
    expect(saveTrigger).toBeTruthy();
  });

  it('should display the cancel trigger', () => {
    const cancelTrigger = getElementBySelector(fixture, '.action__cancel');
    expect(cancelTrigger).toBeTruthy();
  });
});
