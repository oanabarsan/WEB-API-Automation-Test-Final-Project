const { spec, request } = require("pactum");
const { faker } = require("@faker-js/faker");
const baseUrl = "https://practice.expandtesting.com/notes/api";

const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const randomUserName = faker.internet.userName();
const randomPhoneNumber = "0748648813";
const randomCompany = faker.company.name();
const newUserName = faker.internet.userName();
const newPhoneNumber = "0757612883";
const newCompany = faker.company.name();

const requestBodyRegister = {
  email: randomEmail,
  name: randomUserName,
  password: randomPassword,
  phone: randomPhoneNumber,
  company: randomCompany,
};

const requestBodyLogin = {
  email: randomEmail,
  password: randomPassword,
};

const newUserInfo = {
  name: newUserName,
  phone: newPhoneNumber,
  company: newCompany,
}

describe("Update user profile test suites ", () => {
  before(async () => {
    request.setDefaultTimeout(10000);

    await spec()
      .post(`${baseUrl}/users/register`)
      .expectStatus(201)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBodyRegister)
      .expectBodyContains("User account created successfully");

    const login = await spec()
      .post(`${baseUrl}/users/login`)
      .expectStatus(200)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBodyLogin)
      .expectBodyContains("Login successful");

    requestToken = login.body.data.token;
  });

  it("Update user profile test", async () => {
    await spec()
      .patch(`${baseUrl}/users/profile`)
      .expectStatus(200)
      .withHeaders({ "X-Auth-Token": requestToken })
      .withBody(newUserInfo)
      .expectBodyContains("Profile updated successful");
  });

  it("Try to update user profile with no auth token test", async () => {
    await spec()
      .patch(`${baseUrl}/users/profile`)
      .expectStatus(401)
      .withHeaders("Content-Type", "application/json");
  });
});
