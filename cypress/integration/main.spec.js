/// <reference types="cypress" />

context("Main", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should display Application", () => {
    cy.get("body").should("contain.text", "MERN CMS Template");
  });
});
