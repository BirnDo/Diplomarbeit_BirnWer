import TestDefinition, { MinimalDefinition } from "./testDefinition-model";
import { ReadPreference } from "mongodb";

require("./mongo").connect();

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

// test Runs without testCasess
function getMinimalTestDefinitions(req: any, res: any) {
  TestDefinition.find({})
    .read(ReadPreference.NEAREST)
    .then((tests) => {
      const minimalDefinitions: MinimalDefinition[] = [];
      tests.forEach((element) => {
        const minimalDefinition = {
          _id: element._id,
          tester: element.tester,
          createdOn: element.createdOn,
          deadline: element.deadline,
          finished: element.finished,
          __v: element.__v,
          name: element.name,
        };
        minimalDefinitions.push(minimalDefinition);
      });
      res.json(minimalDefinitions);
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
  const { name, createdOn, testCases, finished, tester, deadline } = req.body;

  var testDefinition = new TestDefinition();

  testDefinition.name = name;
  testDefinition.createdOn = createdOn;
  testDefinition.testCases = testCases;
  testDefinition.finished = finished;
  testDefinition.tester = tester;
  testDefinition.deadline = deadline;

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
  const { name, createdOn, testCases, tester, finished, deadline } = req.body;

  TestDefinition.findOne({ _id })
    .then((test) => {
      if (name !== undefined) test.name = name;
      if (tester !== undefined) test.tester = tester;
      if (createdOn !== undefined) test.createdOn = createdOn;
      if (deadline !== undefined) test.deadline = deadline;
      if (finished !== undefined) test.finished = finished;
      if (testCases !== undefined) test.testCases = testCases;
      test.save().then(res.json(test));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//deletes a TestDefinition
function destroy(req: any, res: any) {
  const { _id } = req.params._id;

  TestDefinition.findOneAndRemove({ _id })
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

module.exports = {
  get,
  getMinimalTestDefinitions,
  getFinishedTestDefinitions,
  getById,
  create,
  update,
  destroy,
  getTestCases,
  getTestDefinitionsByTester,
};
