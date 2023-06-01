const { spec, request } = require("pactum");
const { faker } = require("@faker-js/faker");
const baseUrl = "https://practice.expandtesting.com/notes/api";

const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const randomUserName = faker.internet.userName();
const randomJobTitle = faker.person.jobTitle();
const randomDescription = faker.lorem.sentence({ min: 5, max: 10 });

const requestBodyRegister = {
  email: randomEmail,
  name: randomUserName,
  password: randomPassword,
};

const requestBodyLogin = {
  email: randomEmail,
  password: randomPassword,
};

requestBodyNote = {
  title: randomJobTitle,
  description: randomDescription,
  category: "Personal",
};

describe("Create note test suites ", () => {
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

  it("Create note test", async () => {
    await spec()
      .post(`${baseUrl}/notes`)
      .expectStatus(200)
      .withHeaders({ "X-Auth-Token": requestToken })
      .withBody(requestBodyNote)
      .expectBodyContains("Note successfully created");
  });

  it("Try to create note with no auth token test", async () => {
    await spec()
      .post(`${baseUrl}/notes`)
      .expectStatus(401)
      .withHeaders("Content-Type", "application/json");
  });
});
