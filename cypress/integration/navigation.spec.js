/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to the about page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-tid="navigation"] a[href="/about"]', {
      timeout: 10000,
    }).click();
    cy.url().should("include", "/about");
    cy.get("p").contains("designer");
  });
});
