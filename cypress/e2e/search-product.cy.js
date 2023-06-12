/// <reference types = "cypress" />

import SearchPage from "../pages/SearchPage";

describe("Search product test suite", () => {
  it("Search products by 'tees' keyword", () => {
    SearchPage.getSearchField().type('tees{enter}');
    cy.get("#toolbar-amount").should("be.visible");
    cy.contains("3 Items").should("be.visible");
  });
  it("Try to search a non-existing product", () => {
    SearchPage.getSearchField().type('coupon{enter}');
    cy.get("div.message.notice").should("be.visible");
    cy.contains("Your search returned no results.").should("be.visible");
  });
});
