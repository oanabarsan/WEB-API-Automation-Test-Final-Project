/// <reference types = "cypress" />
import { faker } from "@faker-js/faker";
import BrasAndTanksPage from "../pages/BrasAndTanksPage";
import NavBarPage from "../pages/NavBarPage";
import SaleCategoryMenuPage from "../pages/SaleCategoryMenuPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import HeaderPage from "../pages/HeaderPage";
import RegisterPage from "../pages/RegisterPage";

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password({ length: 20 });
const passConfirmation = randomPassword;
const productQuantity = 2;
const updatedQty = 4;

describe("Add to cart product test suite", () => {
  beforeEach("Register user", () => {
    HeaderPage.getCreateAccountLink().click();
    RegisterPage.getFirstName().type(randomFirstName, { delay: 0 });
    RegisterPage.getLastName().type(randomLastName, { delay: 0 });
    RegisterPage.getEmail().type(randomEmail, { delay: 0 });
    RegisterPage.getPassword().type(randomPassword, { delay: 0 });
    RegisterPage.getPassConfirmation().type(passConfirmation);
    RegisterPage.getCreateAccountBtn().contains("Create an Account").click();
    cy.get("div.message-success.success.message")
      .contains("Thank you for registering with Main Website Store.")
      .should("be.visible");
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
    cy.get('span[data-ui-id="page-title-wrapper"]')
      .contains("Shopping Cart")
      .should("be.visible");
  });

  it("Update shopping cart test", () => {
    ShoppingCartPage.getQtyField().clear().type(updatedQty);
    ShoppingCartPage.getUpdatedCartBtn().click();
    cy.get('input[data-role="cart-item-qty"]').should(
      "have.attr",
      "value",
      updatedQty
    );
  });
});
