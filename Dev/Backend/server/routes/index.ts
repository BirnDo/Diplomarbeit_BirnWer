import express from "express";
var router = express.Router();

var testDefinitionService = require("../testDefinition-service");

router.get("/testDefinitions", function (req: any, res: any) {
  testDefinitionService.get(req, res);
});

router.get("/minimalTestDefinitions", function (req: any, res: any) {
  testDefinitionService.getMinimalTestDefinitions(req, res);
});

router.get("/finishedTestDefinitions", function (req: any, res: any) {
  testDefinitionService.getFinishedTestDefinitions(req, res);
});

router.get("/testDefinitionById/:_id", function (req: any, res: any) {
  testDefinitionService.getById(req, res);
});

router.post("/addTestDefinition", function (req: any, res: any) {
  testDefinitionService.create(req, res);
});

router.post("/updateTestDefinition/:_id", function (req: any, res: any) {
  testDefinitionService.update(req, res);
});

router.delete("/deleteTestDefiniton/:_id", function (req: any, res: any) {
  testDefinitionService.destroy(req, res);
});

router.get("/testCasesByDefinitionId/:_id", function (req: any, res: any) {
  testDefinitionService.getTestCases(req, res);
});

router.get("/testDefintionsByTester/:tester", function (req: any, res: any) {
  testDefinitionService.getTestDefinitionsByTester(req, res);
});

router.get(
  "/minimalTestDefintionsByTester/:tester",
  function (req: any, res: any) {
    testDefinitionService.getMinimalTestDefinitionsByTester(req, res);
  }
);

module.exports = router;
