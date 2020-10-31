import { createNewTodo, getTodos } from '../support/app.po';

describe('drag-n-drop-angular', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display todos', () => {
    getTodos().should((items) => expect(items.length).equal(1));
  });

  it('should add item using the todo-form', () => {
    createNewTodo();
    getTodos().should((items) => expect(items.length).equal(2));
  });

  it('should delete a todo item when clicking the delete icon inside todo card', () => {
    cy.get('.todo__delete').last().trigger('click');
    getTodos().should((items) => expect(items.length).equal(1));
  });

  it('should advance a todo status when clicking the advance inside todo card', () => {
    createNewTodo();
    cy.get('.todo__advance').last().trigger('click');
    cy.get('.list__WIP  gus-todo-card').should((items) =>
      expect(items.length).equal(1)
    );
    cy.get('.todo__delete').last().trigger('click');
  });
});
