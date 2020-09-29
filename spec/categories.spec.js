var request = require("request");

var base_url = "http://localhost:9090/categories"
/*
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
*/
describe("Get by id", function() {
  describe("GET/", function() {
    it("return a category", function(done) {
      request.get(base_url+"/5f6d246d92d95032586d9809", function(error, response, body) {
        var json = '[{ "items": [],' + 
            '"_id": "5f6d246d92d95032586d9809",'+
            '"name": "Comidita",'+
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
/*
describe("Get by name", function() {
  describe("GET/", function() {
    it("return a category", function(done) {
      request.get(base_url+"?categoryName=Ropa", function(error, response, body) {
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

describe("Delete a category", function() {
  describe("PUT/", function() {
    it("delete", function(done) {
      request.put(base_url+"/5f6d2078cd36b32bf03c7e5a", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});


'[{"anterior": ['+
    '{ "items": [],'+
      '"_id": "5f6d246d92d95032586d9809",
      '"name": "Ropa",'+
      '"deleted": false,'+
      '"deletedAt": null,'+
      '"__v": 0}],'+
  '"nuevo": {'+
    '"items": [],'+
    '"_id": "5f6d246d92d95032586d9809",'+
    '"name": "Comidita",'+
    '"deleted": false,'+
    '"deletedAt": null,'+
    '"__v": 0},'+
  '"msg": "Category updated"}]'*/
describe("Update a category", function() {
  describe("PATCH/", function() {
    it("update", function(done) {
      request.patch({url:base_url+"/5f6d246d92d95032586d9809",form:{ "name" : "Medicamentos"}}, 
        function(error, response, body) {
          var json = '{"anterior": ['+
          '{ "items": [],'+
            '"_id": "5f6d246d92d95032586d9809",'+
            '"name": "Medicamentos",'+
            '"deleted": false,'+
            '"deletedAt": null,'+
            '"__v": 0}],'+
        '"nuevo": {'+
          '"items": [],'+
          '"_id": "5f6d246d92d95032586d9809",'+
          '"name": "Medicamentos",'+
          '"deleted": false,'+
          '"deletedAt": null,'+
          '"__v": 0},'+c
        '"msg": "Category updated"}'
        console.log()
        var ob = JSON.parse(json)
        var comp = JSON.parse(response.body)
        expect(comp).toEqual(ob);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
