/// <reference types="cypress" />

describe('App', () => {
  it('should include title', () => {
    cy.visit('http://localhost:3000/');
    cy.get(`[data-tid="title"]`).contains('Simon Heys');
  });
});
