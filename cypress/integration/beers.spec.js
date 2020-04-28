/// <reference types="cypress" />

context("Beers", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should get list of beers from database", () => {
    cy.get("#get-beers").click();
    cy.get("#beers-list").its("length").should("be", 3);
  });
});
