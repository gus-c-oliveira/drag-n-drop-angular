import { getAddTodoButton, getTodos } from '../support/app.po';

describe('drag-n-drop-angular', () => {
  beforeEach(() => cy.visit('/'));

  it('should display todo items', () => {
    getTodos().should((items) => expect(items.length).equal(2));
  });

  it('should create a new todo item when clicking the add todo button', () => {
    getAddTodoButton().click();
    getTodos().should((items) => expect(items.length).equal(3));
  });
});
