/// <reference types = "cypress" />
import { faker } from "@faker-js/faker";
import SubscribePage from "../pages/SubscribePage";

const randomEmail = faker.internet.email();

describe("Subscribe to newsletter test suite", () => {
  it("Subscribe to newsletter", () => {
    SubscribePage.getSubscribeField().type(randomEmail);
    SubscribePage.getSubscribeBtn().click();
    cy.get('div[data-ui-id="message-success"]').contains('Thank you for your subscription.').should("be.visible");
  });
});
