var request = require("request");

var base_url = "http://localhost:9090/categories"

describe("prueba", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url+"/conectionHost", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
}); 

describe("Post a new category", function() {
  describe("POST/", function() {
    var json = '{ "name": "Comida"}'
    var bod = JSON.parse(json)
    it("return a new category", function(done) {
      request.post({url:base_url,form:{ "name": "comida"}},function(error, response, body) {
        expect(response.statusCode).toBe(201);
        done();
      });
    });
    
  });
}); 

describe("Get by id", function() {
  describe("GET/", function() {
    it("return a category", function(done) {
      request.get(base_url+"/5f6d2078cd36b32bf03c7e5a", function(error, response, body) {
        var json = '[{ "items": [],' + 
            '"_id": "5f6d2078cd36b32bf03c7e5a",'+
            '"name": "Ropa",'+
            '"deleted": false,'+
            '"deletedAt": null,'+
            '"__v": 0}]'
        var ob = JSON.parse(json)
        var comp = JSON.parse(response.body)
        expect(comp).toEqual(ob);
        done();
      });
    });
  });
}); 
