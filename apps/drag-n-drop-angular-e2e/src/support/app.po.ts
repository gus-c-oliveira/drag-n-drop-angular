export const getTodos = () => cy.get('.todo');
export const getAddTodoButton = () => cy.get('#add-todo');
export const createNewTodo = () => {
  getAddTodoButton().click();
  cy.wait(10);
  cy.get('input').type('Test Task');
  cy.get('mat-select').first().click();
  cy.get('.mat-option-text')
    .contains('TODO')
    .then((option) => option[0].click());
  cy.get('.action__save').click();
};
