Cypress.on('uncaught:exception', (err, runnable) => {
  return false
});

beforeEach(() => {
  cy.visit("https://magento.softwaretestingboard.com/");
});