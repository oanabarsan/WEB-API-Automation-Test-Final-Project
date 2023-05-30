const { spec, request } = require("pactum");

const baseUrl = "https://practice.expandtesting.com/notes/api";

describe("Login user endpoint test suites ", () => {
  before(() => {
    request.setDefaultTimeout(10000);
  });

  it("Login user", async () => {

    const requestBody = {
      email: "oanabarsan@gmail.com",
      password: "pass123!",

    }
    await spec()
      .post(`${baseUrl}/users/login`)
      .expectStatus(200)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("Login successful");
  });


});


