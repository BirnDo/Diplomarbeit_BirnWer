var express = require("express");
var router = express.Router();

var testDefinitionService = require("../testDefinition-service");

router.get("/testDefinitions", function (req, res) {
  testDefinitionService.get(req, res);
});

router.get("/minimalTestDefinitions", function (req, res) {
  testDefinitionService.getMinimalTestDefinitions(req, res);
});

router.get("/testDefinitionById/:_id", function (req, res) {
  testDefinitionService.getById(req, res);
});

router.post("/addTestDefinition", function (req, res) {
  testDefinitionService.create(req, res);
});

router.post("/updateTestDefinition", function (req, res) {
  testDefinitionService.update(req, res);
});

router.delete("/deleteTestDefiniton/:_id", function (req, res) {
  testDefinitionService.destroy(req, res);
});

router.get("/testCasesByDefinitionId/:_id", function (req, res) {
  testDefinitionService.getTestCases(req, res);
});

module.exports = router;
