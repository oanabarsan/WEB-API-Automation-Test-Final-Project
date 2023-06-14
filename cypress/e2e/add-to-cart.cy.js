/// <reference types = "cypress" />
import BrasAndTanksPage from "../pages/BrasAndTanksPage";
import NavBarPage from "../pages/NavBarPage";
import SaleCategoryMenuPage from "../pages/SaleCategoryMenuPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";

const productQuantity = 2;
const updatedQty = 4;

describe("Add to cart product test suite", () => {
  beforeEach("Add to cart", () => {
    NavBarPage.getSaleLink().click();
    SaleCategoryMenuPage.getBrasAndTanksLink().click({ force: true });
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
    cy.get("div[data-ui-id='message-success']")
      .contains("You added Breathe-Easy Tank to your shopping cart.")
      .should("be.visible");
    BrasAndTanksPage.getShoppingCartLink().click();
  });


  it("Update product quantity shopping cart test", () => {
    cy.get('span[data-ui-id="page-title-wrapper"]')
      .contains("Shopping Cart")
      .should("be.visible");
    ShoppingCartPage.getQtyField().clear().type(updatedQty);
    ShoppingCartPage.getUpdatedCartBtn().click();
    cy.get('input[data-role="cart-item-qty"]').should(
      "have.attr",
      "value",
      updatedQty
    );
  });
});
