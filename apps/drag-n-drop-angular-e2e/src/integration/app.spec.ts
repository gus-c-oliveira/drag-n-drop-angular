import { getTodos } from '../support/app.po';

describe('drag-n-drop-angular', () => {
  beforeEach(() => cy.visit('/'));

  it('should display todo items', () => {
    getTodos().should((items) => expect(items.length).equal(2));
  });
});
