/// <reference types="cypress" />

context('Beers', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('#email').type('email@email.com');
    cy.get('#password').type('Red123');
    cy.get('#submit-login').click();
  });

  it('Should get list of beers from database', () => {
    cy.get('#get-beers').click();
    cy.get('#beers-list').its('length').should('be', 3);
  });
});
