const TestDefinition = require("./testDefnition-model");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongo").connect();

//returns all Testdefinitions
function get(req, res) {
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
function getMinimalTestDefinitions(req, res) {
  TestDefinition.find({})
    .read(ReadPreference.NEAREST)
    .then((tests) => {
      const minimalDefinitions = [];
      tests.forEach((element) => {
        const minimalDefinition = {
          _id: element._id,
          testers: element.testers,
          createdOn: element.createdOn,
          deadline: element.deadline,
          __v: element.__v,
        };
        minimalDefinitions.push(minimalDefinition);
      });
      res.json(minimalDefinitions);
    });
}

//returns a single TestDefinition
function getById(req, res) {
  const _id = req.params;

  TestDefinition.findOne({ _id })
    .then((test) => {
      res.json(test);
    })
    .catch((err) => {
      res.status.send(err);
    });
}

//create a new TestDefinition
function create(req, res) {
  const { name, createdOn, testCases, finished, testers, deadline } = req.body;

  var testDefinition = new TestDefinition();

  testDefinition.name = name;
  testDefinition.createdOn = createdOn;
  testDefinition.testCases = testCases;
  testDefinition.finished = finished;
  testDefinition.testers = testers;
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
function update(req, res) {
  const {
    _id,
    name,
    createdOn,
    testCases,
    testers,
    finished,
    deadline,
  } = req.body;

  TestDefinition.findOne({ _id })
    .then((test) => {
      test.name = name;
      test.testers = testers;
      test.createdOn = createdOn;
      test.deadline = deadline;
      test.finished = finished;
      test.testCases = testCases;
      test.save().then(res.json(test));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//deletes a TestDefinition
function destroy(req, res) {
  const { _id } = req.params;

  TestDefinition.findOneAndRemove({ _id })
    .then((test) => {
      res.json(test);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//returns all Test Cases from a given TestDefinition
function getTestCases(req, res) {
  const _id = req.params;

  TestDefinition.findOne({ _id })
    .then((test) => {
      res.json(test.testCases);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// all finished Tests
function getFinishedTestDefinitions(req, res) {
  TestDefinition.find({})
    .where("finished")
    .equals(true)
    .then((test) => {
      res.json(test);
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
};
