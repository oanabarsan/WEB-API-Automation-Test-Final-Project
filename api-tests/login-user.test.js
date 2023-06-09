const { spec, request } = require("pactum");
const { faker } = require("@faker-js/faker");
const baseUrl = "https://practice.expandtesting.com/notes/api";

let randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();
let randomUserName = faker.internet.userName();

const requestBodyRegister = {
  email: randomEmail,
  name: randomUserName,
  password: randomPassword,
};

const requestBodyLogin = {
  email: randomEmail,
  password: randomPassword,
};

describe("Login user endpoint test suites ", () => {
  before(async () => {
    request.setDefaultTimeout(10000);

    await spec()
      .post(`${baseUrl}/users/register`)
      .expectStatus(201)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBodyRegister)
      .expectBodyContains("User account created successfully");
  });

  it("Login user", async () => {
    await spec()
      .post(`${baseUrl}/users/login`)
      .expectStatus(200)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBodyLogin)
      .expectBodyContains("Login successful");
  });

  it("Try to login only with email.", async () => {
    await spec()
      .post(`${baseUrl}/users/login`)
      .expectStatus(400)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBodyLogin.randomEmail);
  });

  it("Try to login only with password.", async () => {
    await spec()
      .post(`${baseUrl}/users/login`)
      .expectStatus(400)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBodyLogin.randomPassword);
  });
});
