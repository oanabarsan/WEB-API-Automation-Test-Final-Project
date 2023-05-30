/// <reference types = "cypress" />

import SearchPage from "../pages/SearchPage";

describe("Search product test suite", () => {


  it("Search products by 'tees' keyword", () => {
    SearchPage.getSearchField().type('tees{enter}');
    cy.get("#toolbar-amount").should("be.visible");
    cy.contains("3 Items").should("be.visible");
  });
});
