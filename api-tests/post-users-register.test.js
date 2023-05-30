const { spec, request } = require("pactum");

const { faker } = require("@faker-js/faker");

const baseUrl = "https://practice.expandtesting.com/notes/api";

describe("Create new user endpoint test suites ", () => {
  before(() => {
    request.setDefaultTimeout(5000);
  });

  it("Create new user test", async () => {
    randomEmail = faker.internet.email();

    const requestBody = {
      email: randomEmail,
      name: "Oana",
      password: "pass123!",
    };

    console.log(randomEmail);

    await spec()
      .post(`${baseUrl}/users/register`)
      .expectStatus(201)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("User account created successfully")
  });

  it("Try to register new user only with email inserted in the body", async () => {
    const requestEmail = {
      email: randomEmail,
    };

    await spec()
      .post(`${baseUrl}/users/register`)
      .withBody(requestEmail)
      .expectStatus(400)
      .expectBodyContains("User name must be between 4 and 30 characters");
  });
});
