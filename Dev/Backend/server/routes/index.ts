import express from "express";
var router = express.Router();

var testDefinitionService = require("../testDefinition-service");

//#region swagger definitions
/**
 * @swagger
 * definitions:
 *   TestDefinition:
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       createdOn:
 *         type: string
 *       tester:
 *         type: string
 *       finished:
 *         type: boolean
 *       deadline:
 *         type: string
 *       doneOn:
 *         type: string
 *       channelID:
 *         type: string
 *       __v:
 *         type: integer
 *       testCases:
 *         type: array
 *         items:
 *           properties:
 *             _id:
 *               type: string
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             status:
 *               type: string
 *             active:
 *               type: boolean
 *             comments:
 *               type: string
 *             image:
 *               type: string
 *             required:
 *               type: boolean
 *   MinimalTestDefinition:
 *     properties:
 *       _id:
 *         type: string
 *       tester:
 *         type: string
 *       createdOn:
 *         type: string
 *       deadline:
 *         type: string
 *       doneOn:
 *         type: string
 *       __v:
 *         type: string
 *       name:
 *         type: string
 *       channel:
 *         type: string
 *   InvalidResponse:
 *     properties:
 *       statusCode:
 *         type: string
 *       message:
 *         type: string
 *   TestCase:
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: String
 *       active:
 *         type: boolean
 *       comments:
 *         type: string
 *       image:
 *         type: string
 *       required:
 *         type: boolean
 */
//#endregion

//#region swagger
/**
 * @swagger
 * /testDefinitions:
 *   get:
 *     description:  Get all the TestDefinitions
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.get("/testDefinitions", function (req: any, res: any) {
  testDefinitionService.get(req, res);
});

//#region swagger
/**
 * @swagger
 * /minimalTestDefinitions:
 *   get:
 *     description:  get minmal Definitions
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/MinimalTestDefinition'
 */
//#endregion
router.get("/minimalTestDefinitions", function (req: any, res: any) {
  testDefinitionService.getMinimalTestDefinitions(req, res);
});

//#region swagger
/**
 * @swagger
 * /finishedTestDefinitions:
 *   get:
 *     description:  get finished tests
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.get("/finishedTestDefinitions", function (req: any, res: any) {
  testDefinitionService.getFinishedTestDefinitions(req, res);
});

//#region swagger
/**
 * @swagger
 * /testDefinitionById/{_id}:
 *   get:
 *     description: get the Defintion with thte specified _id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: _id of the TestDefinition
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.get("/testDefinitionById/:_id", function (req: any, res: any) {
  testDefinitionService.getById(req, res);
});

//#region swagger
/**
 * @swagger
 * /addTestDefinition:
 *   post:
 *     description: add a new Test Definition
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: body
 *         description: name of the TestDefinition
 *         required: true
 *         type: string
 *       - name: tester
 *         in: body
 *         description: email of the tester
 *         required: true
 *         type: string
 *       - name: createdOn
 *         in: body
 *         description: Date of creation
 *         required: true
 *         type: string
 *       - name: finished
 *         in: body
 *         description: wether the test is finished or not
 *         required: true
 *         type: boolean
 *       - name: deadline
 *         in: body
 *         description: the Date of the deadline
 *         required: true
 *         type: string
 *       - name: testCases
 *         in: body
 *         description: an array of testCases
 *         required: true
 *         type: array
 *         items:
 *           $ref: '#/definitions/TestCase'
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.post("/addTestDefinition", function (req: any, res: any) {
  testDefinitionService.create(req, res);
});

//#region swagger
/**
 * @swagger
 * /updateTestDefinition/{_id}:
 *   post:
 *     description: update the testDefinition with the given _id
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: _id of the TestDefinition
 *         required: true
 *         type: string
 *       - name: name
 *         in: body
 *         description: name of the TestDefinition
 *         required: fasle
 *         type: string
 *       - name: tester
 *         in: body
 *         description: email of the tester
 *         required: false
 *         type: string
 *       - name: createdOn
 *         in: body
 *         description: Date of creation
 *         required: false
 *         type: string
 *       - name: finished
 *         in: body
 *         description: wether the test is finished or not
 *         required: false
 *         type: boolean
 *       - name: deadline
 *         in: body
 *         description: the Date of the deadline
 *         required: false
 *         type: string
 *       - name: testCases
 *         in: body
 *         description: an array of testCases
 *         required: false
 *         type: array
 *         items:
 *           $ref: '#/definitions/TestCase'
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.post("/updateTestDefinition/:_id", function (req: any, res: any) {
  testDefinitionService.update(req, res);
});

//#region swagger
/**
 * @swagger
 * /deleteTestDefiniiton/{_id}:
 *   delete:
 *     description: deletets the Test with the specified _id
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: _id of the TestDefinition
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.delete("/deleteTestDefiniton/:_id", function (req: any, res: any) {
  testDefinitionService.destroy(req, res);
});

//#region swagger
/**
 * @swagger
 * /testCasesByDefinitionId/{_id}:
 *   get:
 *     description: returns the TestCases from the test with the specified _id
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: _id of the TestDefinition
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TestCase'
 */
//#endregion
router.get("/testCasesByDefinitionId/:_id", function (req: any, res: any) {
  testDefinitionService.getTestCases(req, res);
});

//#region swagger
/**
 * @swagger
 * /testDefinitionsByTester/{tester}:
 *   get:
 *     description: returns all Tests for one Tester
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: tester
 *         in: path
 *         description: email-address of the tester
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.get("/testDefintionsByTester/:tester", function (req: any, res: any) {
  testDefinitionService.getTestDefinitionsByTester(req, res);
});

//#region swagger
/**
 * @swagger
 * /minimalTestDefintionsByTester/{tester}:
 *   get:
 *     description: returns all Minimal Tests for one Tester
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: tester
 *         in: path
 *         description: email-address of the tester
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/MinimalTestDefinition'
 */
//#endregion
router.get(
  "/minimalTestDefintionsByTester/:tester",
  function (req: any, res: any) {
    testDefinitionService.getMinimalTestDefinitionsByTester(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /testDefinitionsByChannelID/{channelID}:
 *   get:
 *     description: returns all Tests for the given channel
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: tester
 *         in: path
 *         description: the ID of the channel
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.get(
  "/testDefinitionsByChannelID/:channelID",
  function (req: any, res: any) {
    testDefinitionService.getTestDefinitionsByChannel(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /minimalTestDefinitionsByChannelID/{channelID}:
 *   get:
 *     description: returns all Minimal Tests for the given channel
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: tester
 *         in: path
 *         description: the ID of the channel
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/MinimalTestDefinition'
 */
//#endregion
router.get(
  "/minimalTestDefinitionsByChannelID/:channelID",
  function (req: any, res: any) {
    testDefinitionService.getMinimalTestDefinitionsByChannel(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /getDefinitionsByTimePeriod:
 *   post:
 *     description: returns all Tests in a given Time period
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: startTime
 *         in: body
 *         description: the start Date
 *         required: true
 *         type: string
 *       - name: endTime
 *         in: body
 *         description: the end Date (if not given defaults to current Date)
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.post("/getDefinitionsByTimePeriod", function (req: any, res: any) {
  testDefinitionService.getTestDefinitionsByTimePeriod(req, res);
});

//#region swagger
/**
 * @swagger
 * /getDefinitionsByTimePeriodAndChannel/{channelID}:
 *   post:
 *     description: returns all Tests in a given Time period for a given channel
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: channelID
 *         in: path
 *         description: the channelID
 *         required: true
 *         type: string
 *       - name: startTime
 *         in: body
 *         description: the start Date
 *         required: true
 *         type: string
 *       - name: endTime
 *         in: body
 *         description: the end Date (if not given defaults to current Date)
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TestDefinition'
 */
//#endregion
router.post(
  "/getDefinitionsByTimePeriodAndChannel/:channelID",
  function (req: any, res: any) {
    testDefinitionService.getDefinitionsByTimePeriodAndChannel(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /getSuccessStatistics:
 *   get:
 *     description: returns successful, unsuccelssful and not finished tests
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: integer
 *               description: the amount of successful tests
 *             failed:
 *               type: integer
 *               description: the amount of failed tests
 *             notDone:
 *               type: integer
 *               description: the amount of open tests
 */
//#endregion
router.get("/getSuccessStatistics", function (req: any, res: any) {
  testDefinitionService.getSuccessStatistics(req, res);
});

//#region swagger
/**
 * @swagger
 * /getSuccessStatisticsByChannel/{channelID}:
 *   get:
 *     description: returns successful, unsuccelssful and not finished tests for te given channel
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: channelID
 *         in: path
 *         description: the channelID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: integer
 *               description: the amount of successful tests
 *             failed:
 *               type: integer
 *               description: the amount of failed tests
 *             notDone:
 *               type: integer
 *               description: the amount of open tests
 */
//#endregion
router.get(
  "/getSuccessStatisticsByChannel/:channelID",
  function (req: any, res: any) {
    testDefinitionService.getSuccessStatisticsByChannelId(req, res);
  }
);

module.exports = router;
