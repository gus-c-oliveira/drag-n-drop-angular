import { getAddTodoButton, getTodos } from '../support/app.po';

describe('drag-n-drop-angular', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display todos', () => {
    getTodos().should((items) => expect(items.length).equal(1));
  });

  describe('add task', () => {
    it('should display the todo form component when clicking the add item button', () => {
      getAddTodoButton().click();
      cy.get('gus-todo-form').should((items) => expect(items.length).equal(1));
    });
  });

  it('should delete a todo item when clicking the delete inside todo card', () => {
    cy.get('span.todo__delete').last().trigger('click');
    getTodos().should((items) => expect(items.length).equal(1));
  });

  it('should advance a todo status when clicking the advance inside todo card', () => {
    getAddTodoButton().click();
    cy.wait(50);
    cy.get('span.todo__advance').last().trigger('click');
    getTodos().should((items) => expect(items[1].innerHTML).contain('WIP'));
    cy.get('span.todo__delete').last().trigger('click');
  });
});
