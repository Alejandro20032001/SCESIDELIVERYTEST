import request from "request"

var base_url = "http://localhost:9090/categories/"

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });
  });
});