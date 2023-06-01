const { spec, request } = require("pactum");

const { faker } = require("@faker-js/faker");

const baseUrl = "https://practice.expandtesting.com/notes/api";

const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const randomUserName = faker.internet.userName();

const requestBody = {
  email: randomEmail,
  name: randomUserName,
  password: randomPassword,
};

describe("Create new user endpoint test suites ", () => {
  before(() => {
    request.setDefaultTimeout(5000);
  });

  it("Create new user test", async () => {
    await spec()
      .post(`${baseUrl}/users/register`)
      .expectStatus(201)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("User account created successfully");
  });

  it("Try to register new user only with email inserted in the body", async () => {
    await spec()
      .post(`${baseUrl}/users/register`)
      .withBody(requestBody.randomEmail)
      .expectStatus(400)
      .expectBodyContains("User name must be between 4 and 30 characters");
  });

  it("Try to register new user only password inserted in the body", async () => {
    await spec()
      .post(`${baseUrl}/users/register`)
      .withBody(requestBody.randomPassword)
      .expectStatus(400)
      .expectBodyContains("User name must be between 4 and 30 characters");
  });
});
