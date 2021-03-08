import express from "express";
var router = express.Router();

require("../mongo").connect();

var testDefinitionService = require("../testDefinition-service");
var statisticsService = require("../statistics-service");
var minimalTestDefinitionService = require("../minimalTestDefinition-service");

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
 *   InsertDefinition:
 *     properties:
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
 *       testCases:
 *         type: array
 *         items:
 *           properties:
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
 *   TimePeriod:
 *     properties:
 *       startDate:
 *         type: string
 *       endDate:
 *         type: string
 */
//#endregion

//#region tags
/**
 * @swagger
 * tags:
 *  - name: "Test Definitions"
 *    description: "All APIs for Test Defintions"
 *  - name: "Minimal Test Definitions"
 *    description: "All APIs for Minimal Test Defintions"
 *  - name: "Statistics"
 *    description: "All APIs for Statistics"
 */
//#endregion

//#region swagger
/**
 * @swagger
 * /testDefinitions:
 *   get:
 *     tags:
 *       - "Test Definitions"
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
 * /testDefinitions/{channelID}:
 *   get:
 *     tags:
 *       - "Test Definitions"
 *     description: returns all Tests for the given channel
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: channelID
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
router.get("/testDefinitions/:channelID", function (req: any, res: any) {
  testDefinitionService.getTestDefinitionsByChannel(req, res);
});

//#region swagger
/**
 * @swagger
 * /testDefinitionsByTester/{tester}:
 *   get:
 *     tags:
 *       - "Test Definitions"
 *     description: returns all Tests for one Tester, Legacy API
 *     deprecated: true
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
 * /finishedTestDefinitions:
 *   get:
 *     tags:
 *       - "Test Definitions"
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
 *     tags:
 *       - "Test Definitions"
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
 *     tags:
 *       - "Test Definitions"
 *     description: add a new Test Definition
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: The content of the newly created task
 *         required: true
 *         schema:
 *           $ref: '#/definitions/InsertDefinition'
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
 *     tags:
 *       - "Test Definitions"
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
 *       - name: body
 *         in: body
 *         description: Fields that should get updated, every field is optional, except _id
 *         required: true
 *         schema:
 *           $ref: '#/definitions/InsertDefinition'
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
 * /deleteTestDefiniton/{_id}:
 *   delete:
 *     tags:
 *       - "Test Definitions"
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
 *     tags:
 *       - "Test Definitions"
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
 * /getDefinitionsByTimePeriod:
 *   post:
 *     tags:
 *       - "Test Definitions"
 *     description: returns all Tests in a given Time period
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: the start and end Date, end Date can be null and will be replaced with the current Date
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimePeriod'
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
 * /getDefinitionsByTimePeriod/{channelID}:
 *   post:
 *     tags:
 *       - "Test Definitions"
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
 *       - name: body
 *         in: body
 *         description: the start and end Date, end Date can be null and will be replaced with the current Date
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimePeriod'
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
  "/getDefinitionsByTimePeriod/:channelID",
  function (req: any, res: any) {
    testDefinitionService.getDefinitionsByTimePeriodAndChannel(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /minimalTestDefinitions:
 *   get:
 *     tags:
 *       - "Minimal Test Definitions"
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
  minimalTestDefinitionService.getMinimalTestDefinitions(req, res);
});

//#region swagger
/**
 * @swagger
 * /minimalTestDefinitions/{channelID}:
 *   get:
 *     tags:
 *       - "Minimal Test Definitions"
 *     description: returns all Minimal Tests for the given channel
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: channelID
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
router.get("/minimalTestDefinitions/:channelID", function (req: any, res: any) {
  minimalTestDefinitionService.getMinimalTestDefinitionsByChannel(req, res);
});

//#region swagger
/**
 * @swagger
 * /minimalTestDefintionsByTester/{tester}:
 *   get:
 *     tags:
 *       - "Minimal Test Definitions"
 *     description: returns all Minimal Tests for one Tester, Legacy API
 *     deprecated: true
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
    minimalTestDefinitionService.getMinimalTestDefinitionsByTester(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /getMinimalDefinitionsByTimePeriod:
 *   post:
 *     tags:
 *       - "Minimal Test Definitions"
 *     description: returns all minimal Tests in a given Time period
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: the start and end Date, end Date can be null and will be replaced with the current Date
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimePeriod'
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/MinimalTestDefinition'
 */
//#endregion
router.post(
  "/getMinimalDefinitionsByTimePeriod",
  function (req: any, res: any) {
    minimalTestDefinitionService.getMinimalTestDefinitionsByTimePeriod(
      req,
      res
    );
  }
);

//#region swagger
/**
 * @swagger
 * /getMinimalDefinitionsByTimePeriod/{channelID}:
 *   post:
 *     tags:
 *       - "Minimal Test Definitions"
 *     description: returns all minimal Tests in a given Time period for a given channel
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
 *       - name: body
 *         in: body
 *         description: the start and end Date, end Date can be null and will be replaced with the current Date
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimePeriod'
 *     responses:
 *       200:
 *         description: successful operations
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/MinimalTestDefinition'
 */
//#endregion
router.post(
  "/getMinimalDefinitionsByTimePeriod/:channelID",
  function (req: any, res: any) {
    minimalTestDefinitionService.getMinimalTestDefinitionsByTimePeriodAndChannelId(
      req,
      res
    );
  }
);

//#region swagger
/**
 * @swagger
 * /getSuccessStatistics:
 *   get:
 *     tags:
 *       - "Statistics"
 *     description: returns successful, failed and not finished tests
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
  statisticsService.getSuccessStatistics(req, res);
});

//#region swagger
/**
 * @swagger
 * /getSuccessStatistics/{channelID}:
 *   get:
 *     tags:
 *       - "Statistics"
 *     description: returns successful, failed and not finished tests for te given channel
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
router.get("/getSuccessStatistics/:channelID", function (req: any, res: any) {
  statisticsService.getSuccessStatisticsByChannelId(req, res);
});

//#region swagger
/**
 * @swagger
 * /getSuccessStatisticsByTimePeriod:
 *   post:
 *     tags:
 *       - "Statistics"
 *     description: returns successful, failed and not finished tests
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: the start and end Date, end Date can be null and will be replaced with the current Date
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimePeriod'
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
router.post("/getSuccessStatisticsByTimePeriod", function (req: any, res: any) {
  statisticsService.getSuccessStatisticsByTimePeriod(req, res);
});

//#region swagger
/**
 * @swagger
 * /getSuccessStatisticsByTimePeriod/{channelID}:
 *   post:
 *     tags:
 *       - "Statistics"
 *     description: returns successful, failed and not finished tests for te given channel
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
 *       - name: body
 *         in: body
 *         description: the start and end Date, end Date can be null and will be replaced with the current Date
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimePeriod'
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
router.post(
  "/getSuccessStatisticsByTimePeriod/:channelID",
  function (req: any, res: any) {
    statisticsService.getSuccessStatisticsByTimePeriodAndChannelId(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /getTestCaseSuccessStatistics:
 *   get:
 *     tags:
 *       - "Statistics"
 *     description: returns successful, failed, optional and not finished tests
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
 *             optional:
 *               type: integer
 *               description: the amount of optional tests
 *             notDone:
 *               type: integer
 *               description: the amount of open tests
 */
//#endregion
router.get("/getTestCaseSuccessStatistics", function (req: any, res: any) {
  statisticsService.getTestCaseSuccessStatistics(req, res);
});

//#region swagger
/**
 * @swagger
 * /getTestCaseSuccessStatistics/{channelID}:
 *   get:
 *     tags:
 *       - "Statistics"
 *     description: returns successful, failed, optional and not finished tests
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
 *             optional:
 *               type: integer
 *               description: the amount of optional tests
 *             notDone:
 *               type: integer
 *               description: the amount of open tests
 */
//#endregion
router.get(
  "/getTestCaseSuccessStatistics/:channelID",
  function (req: any, res: any) {
    statisticsService.getTestCaseSuccessStatisticsByChannelId(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /getTestCaseSuccessStatisticsByTimePeriod:
 *   post:
 *     tags:
 *       - "Statistics"
 *     description: returns successful, failed, optional and not finished tests
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: the start and end Date, end Date can be null and will be replaced with the current Date
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimePeriod'
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
 *             optional:
 *               type: integer
 *               description: the amount of optional tests
 *             notDone:
 *               type: integer
 *               description: the amount of open tests
 */
//#endregion
router.post(
  "/getTestCaseSuccessStatisticsByTimePeriod",
  function (req: any, res: any) {
    statisticsService.getTestCaseSuccessStatisticsByTimePeriod(req, res);
  }
);

//#region swagger
/**
 * @swagger
 * /getTestCaseSuccessStatisticsByTimePeriod/{channelID}:
 *   post:
 *     tags:
 *       - "Statistics"
 *     description: returns successful, failed, optional and not finished tests
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
 *       - name: body
 *         in: body
 *         description: the start and end Date, end Date can be null and will be replaced with the current Date
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimePeriod'
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
 *             optional:
 *               type: integer
 *               description: the amount of optional tests
 *             notDone:
 *               type: integer
 *               description: the amount of open tests
 */
//#endregion
router.post(
  "/getTestCaseSuccessStatisticsByTimePeriod/:channelID",
  function (req: any, res: any) {
    statisticsService.getTestCaseSuccessStatisticsByTimePeriodAndChannelId(
      req,
      res
    );
  }
);

module.exports = router;
