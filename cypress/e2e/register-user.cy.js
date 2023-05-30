/// <reference types = "cypress" />

import { faker } from "@faker-js/faker";
import HeaderPage from "../pages/HeaderPage";
import RegisterPage from "../pages/RegisterPage";

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const passConfirmation = randomPassword;

describe("Register user test suite", () => {
  it("Register with valid creds", () => {
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
  });
});
