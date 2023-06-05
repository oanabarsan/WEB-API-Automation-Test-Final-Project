/// <reference types = "cypress" />

import BrasAndTanksPage from "../pages/BrasAndTanksPage";
import NavBarPage from "../pages/NavBarPage";
import SaleCategoryMenuPage from "../pages/SaleCategoryMenuPage";

const productQuantity = 2;

describe("Add to cart product test suite", () => {
  it("Add to cart test", () => {
    NavBarPage.getSaleLink().click();
    SaleCategoryMenuPage.getBrasAndTanksLink().click({force: true});
    BrasAndTanksPage.getFirstProduct().click();
    BrasAndTanksPage.getProductSize().click();
    BrasAndTanksPage.getProductColor().click();
    BrasAndTanksPage.getProductQuantity().clear().type(productQuantity);
    cy.intercept({
      method: "POST",
      url: "**/product/*",
    }).as("addProductAPI");
    BrasAndTanksPage.getAddToCartBtn().contains("Add to Cart").click();
    cy.wait("@addProductAPI").its("response.statusCode").should("eq", 200);
    cy.get("div[data-ui-id='message-success']").contains('You added Breathe-Easy Tank to your shopping cart.').should("be.visible");
  });
});
