const { spec, request } = require("pactum");
const { faker } = require("@faker-js/faker");
const baseUrl = "https://practice.expandtesting.com/notes/api";
const getHealthCheckSchema = require("../api-tests/data/response/get-health-check-response-schema.json");

describe("Get health check endpoint test suite", () => {

  it("Get health check test", async () => {
    await spec()
      .get(`${baseUrl}/health-check`)
      .expectStatus(200)
      .expectResponseTime(3000)
      .withHeaders("Content-Type", "application/json")
      .expectJsonSchema(getHealthCheckSchema);
  });


});
