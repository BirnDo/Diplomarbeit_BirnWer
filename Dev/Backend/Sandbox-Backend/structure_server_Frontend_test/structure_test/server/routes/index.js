var express = require("express");
var router = express.Router();

var testDefinitionService = require("../testDefinition-service");

router.get("/testDefinitions", function (req, res, next) {
  testDefinitionService.get(req, res);
});

router.get("/testDefinitionById/:_id", function (req, res, next) {
  testDefinitionService.getById(req, res);
});

router.post("/addTestDefinition", function (req, res, next) {
  testDefinitionService.create(req, res);
});

router.post("/updateTestDefinition", function (req, res, next) {
  testDefinitionService.update(req, res);
});

router.delete("/deleteTestDefiniton/:_id", function (req, res, next) {
  testDefinitionService.destroy(req, res);
});

module.exports = router;
