/// <reference types="cypress" />

context('User', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should login as user', () => {
    cy.get('#email').type('email@email.com');
    cy.get('#password').type('Red123');
    cy.get('#submit-login').click();
    cy.get('body').should('contain.text', 'Tester Name');
  });
});
