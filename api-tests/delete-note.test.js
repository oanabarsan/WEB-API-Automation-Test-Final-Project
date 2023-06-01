const { spec, request } = require("pactum");

const { faker } = require("@faker-js/faker");

const baseUrl = "https://practice.expandtesting.com/notes/api";

const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const randomUserName = faker.internet.userName();

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

describe("Delete note test suites ", () => {
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

    const createdNote = await spec()
      .post(`${baseUrl}/notes`)
      .expectStatus(200)
      .withHeaders({ "X-Auth-Token": requestToken })
      .withBody(requestBodyNote)
      .expectBodyContains("Note successfully created");

    noteId = createdNote.body.data.id;
  });

  it("Delete note test", async () => {
    await spec()
      .delete(`${baseUrl}/notes/${noteId}`)
      .expectStatus(200)
      .withHeaders({ "X-Auth-Token": requestToken })
      .expectBodyContains("Note successfully deleted");
  });

  it("Try to delete note without auth token test", async () => {
    await spec()
      .delete(`${baseUrl}/notes/${noteId}`)
      .expectStatus(401)
      .withHeaders("Content-Type", "application/json");
  });

  it("Try to delete note with no id in the endpoint test", async () => {
    await spec()
      .delete(`${baseUrl}/notes/`)
      .expectStatus(404)
      .withHeaders({ "X-Auth-Token": requestToken });
  });
});
