const { spec, request } = require("pactum");
const { faker } = require("@faker-js/faker");
const baseUrl = "https://practice.expandtesting.com/notes/api";

let randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();
let randomUserName = faker.internet.userName();

let requestToken = "";

const requestBodyRegister = {
  email: randomEmail,
  name: randomUserName,
  password: randomPassword,
};

const requestBodyLogin = {
  email: randomEmail,
  password: randomPassword,
};

const requestBodyNote = {
  title: "Practice API automation test",
  description: "Create API automation test",
  category: "Personal",
};

describe("Get users profile test suite", () => {
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

  it("Get users profile test", async () => {
    await spec()
      .get(`${baseUrl}/users/profile`)
      .expectStatus(200)
      .expectResponseTime(3000)
      .withHeaders({
        "X-Auth-Token": requestToken,
        "Content-Type": "application/json",
      });
  });

  it("Get users profile without auth token test", async () => {
    await spec()
      .get(`${baseUrl}/users/profile`)
      .expectStatus(401)
      .expectResponseTime(3000)
      .withHeaders("Content-Type", "application/json");
  });
});
