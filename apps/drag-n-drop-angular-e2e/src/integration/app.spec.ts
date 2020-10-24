import { getAddTodoButton, getTodos } from '../support/app.po';

describe('drag-n-drop-angular', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display todos', () => {
    getTodos().should((items) => expect(items.length).equal(1));
  });

  it('should create a new todo item when clicking the add todo button', () => {
    getAddTodoButton().click();
    cy.wait(50);
    getTodos().should((items) => expect(items.length).equal(2));
  });

  it('should delete a todo item when clicking the delete inside todo card', () => {
    cy.get('span.delete').last().trigger('click');
    getTodos().should((items) => expect(items.length).equal(1));
  });

  it('should advance a todo status when clicking the advance inside todo card', () => {
    getAddTodoButton().click();
    cy.wait(50);
    cy.get('span.advance').last().trigger('click');
    getTodos().should((items) => expect(items[1].innerHTML).contain('WIP'));
    cy.get('span.delete').last().trigger('click');
  });
});
