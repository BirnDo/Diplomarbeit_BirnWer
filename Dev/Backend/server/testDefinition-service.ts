import TestDefinition from "./testDefinition-model";
import { ReadPreference } from "mongodb";

//returns all Testdefinitions
function get(req: any, res: any) {
  TestDefinition.find({})
    .read(ReadPreference.NEAREST)
    .then((tests) => {
      res.json(tests);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//returns a single TestDefinition
function getById(req: any, res: any) {
  const _id = req.params._id;

  TestDefinition.findOne({ _id })
    .then((test) => {
      res.json(test);
    })
    .catch((err) => {
      res.status.send(err);
    });
}

//create a new TestDefinition
function create(req: any, res: any) {
  const {
    name,
    createdOn,
    testCases,
    finished,
    tester,
    deadline,
    channelID,
    doneOn,
  } = req.body;

  var testDefinition = new TestDefinition();

  testDefinition.name = name;
  testDefinition.createdOn = createdOn;
  testDefinition.testCases = testCases;
  testDefinition.finished = finished;
  testDefinition.tester = tester;
  testDefinition.deadline = deadline;
  testDefinition.channelID = channelID;
  testDefinition.doneOn = doneOn;

  testDefinition
    .save()
    .then(() => {
      res.json(testDefinition);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//updates a TestDefinition
function update(req: any, res: any) {
  const _id = req.params._id;
  const {
    name,
    createdOn,
    testCases,
    tester,
    finished,
    deadline,
    channelID,
    doneOn,
  } = req.body;

  TestDefinition.findOne({ _id })
    .then((test) => {
      if (name !== undefined) test.name = name;
      if (tester !== undefined) test.tester = tester;
      if (createdOn !== undefined) test.createdOn = createdOn;
      if (deadline !== undefined) test.deadline = deadline;
      if (finished !== undefined) test.finished = finished;
      if (testCases !== undefined) test.testCases = testCases;
      if (channelID !== undefined) test.channelID = channelID;
      if (doneOn !== undefined) test.doneOn = doneOn;
      test.save().then((test) => {
        res.json(test);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//deletes a TestDefinition
function destroy(req: any, res: any) {
  const _id = req.params._id;

  TestDefinition.findByIdAndDelete({ _id: _id })
    .then((test) => {
      res.json(test);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//returns all Test Cases from a given TestDefinition
function getTestCases(req: any, res: any) {
  const _id = req.params._id;

  TestDefinition.findOne({ _id })
    .then((test) => {
      res.json(test.testCases);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// all finished Tests
function getFinishedTestDefinitions(req: any, res: any) {
  TestDefinition.find({})
    .where("finished")
    .equals(true)
    .then((tests) => {
      res.json(tests);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// all Tests from one person
function getTestDefinitionsByTester(req: any, res: any) {
  const tester = req.params.tester;
  TestDefinition.find({})
    .where("tester")
    .equals(tester)
    .then((tests) => {
      res.json(tests);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// tests per Channel
function getTestDefinitionsByChannel(req: any, res: any) {
  const channelID = req.params.channelID;
  TestDefinition.find({})
    .where("channelID")
    .equals(channelID)
    .then((tests) => {
      res.json(tests);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// get Tests in a time period
function getTestDefinitionsByTimePeriod(req: any, res: any) {
  const startDate = Date.parse(
    req.body.startDate.split("T")[0] + "T00:00:00.000Z"
  );
  const endDate =
    req.body.endDate == null
      ? Date.now()
      : Date.parse(req.body.endDate.split("T")[0] + "T23:59:59.999Z");

  TestDefinition.find({})
    .then((tests) => {
      const filteredDefinitions = tests.filter(
        (test) =>
          Date.parse("" + test.doneOn) >= startDate &&
          Date.parse("" + test.doneOn) <= endDate
      );
      res.json(filteredDefinitions);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// get Tests in a time period for a specific channel
function getTestDefinitionsByTimePeriodAndChannelId(req: any, res: any) {
  const channelID = req.params.channelID;
  const startDate = Date.parse(
    req.body.startDate.split("T")[0] + "T00:00:00.000Z"
  );
  const endDate =
    req.body.endDate == null
      ? Date.now()
      : Date.parse(req.body.endDate.split("T")[0] + "T23:59:59.999Z");
  TestDefinition.find({})
    .where("channelID")
    .equals(channelID)
    .then((tests) => {
      const filteredDefinitions = tests.filter(
        (test) =>
          Date.parse("" + test.doneOn) >= startDate &&
          Date.parse("" + test.doneOn) <= endDate
      );
      res.json(filteredDefinitions);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = {
  get,
  getFinishedTestDefinitions,
  getById,
  create,
  update,
  destroy,
  getTestCases,
  getTestDefinitionsByTester,
  getTestDefinitionsByChannel,
  getTestDefinitionsByTimePeriod,
  getTestDefinitionsByTimePeriodAndChannelId,
};
