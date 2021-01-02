const TestDefinition = require("./testDefnition-model");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongo").connect();

function get(req, res) {
  const docquery = TestDefinition.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then((tests) => {
      res.json(tests);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

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

function update(req, res) {
  const { _id, name, createdOn, testCases, testers, deadline } = req.body;

  TestDefinition.findOne({ _id })
    .then((test) => {
      test.name = name;
      test.testers = testers;
      test.createdOn = createdOn;
      test.deadline = deadline;
      test.testCases = testCases;
      test.save().then(res.json(test));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

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

module.exports = {
  get,
  getById,
  create,
  update,
  destroy,
};
