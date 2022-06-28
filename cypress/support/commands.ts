/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add("getByTestId", (testID: string) => {
  return cy.get(`[data-testid="${testID}"]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(id: string): Chainable;
    }
  }
}
export {};
