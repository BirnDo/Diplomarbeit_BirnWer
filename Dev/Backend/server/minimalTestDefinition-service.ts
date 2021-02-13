import TestDefinition, { MinimalDefinition } from "./testDefinition-model";
import { ReadPreference } from "mongodb";

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
          doneOn: element.doneOn,
          finished: element.finished,
          __v: element.__v,
          name: element.name,
          channelID: element.channelID,
        };
        minimalDefinitions.push(minimalDefinition);
      });
      res.json(minimalDefinitions);
    });
}

// for minimal testRuns
function getMinimalTestDefinitionsByTester(req: any, res: any) {
  const tester = req.params.tester;
  TestDefinition.find({})
    .where("tester")
    .equals(tester)
    .then((tests) => {
      const minimalDefinitions: MinimalDefinition[] = [];
      tests.forEach((element) => {
        const minimalDefinition = {
          _id: element._id,
          tester: element.tester,
          createdOn: element.createdOn,
          deadline: element.deadline,
          doneOn: element.doneOn,
          finished: element.finished,
          __v: element.__v,
          name: element.name,
          channelID: element.channelID,
        };
        minimalDefinitions.push(minimalDefinition);
      });
      res.json(minimalDefinitions);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// Minimal Test per channel
function getMinimalTestDefinitionsByChannel(req: any, res: any) {
  const channelID = req.params.channelID;
  TestDefinition.find({})
    .where("channelID")
    .equals(channelID)
    .then((tests) => {
      const minimalDefinitions: MinimalDefinition[] = [];
      tests.forEach((element) => {
        const minimalDefinition = {
          _id: element._id,
          tester: element.tester,
          createdOn: element.createdOn,
          deadline: element.deadline,
          doneOn: element.doneOn,
          finished: element.finished,
          __v: element.__v,
          name: element.name,
          channelID: element.channelID,
        };
        minimalDefinitions.push(minimalDefinition);
      });
      res.json(minimalDefinitions);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// get minimal Tests in a time period
function getMinimalTestDefinitionsByTimePeriod(req: any, res: any) {
  const startTime = Date.parse(req.body.startTime);
  const endTime =
    req.body.endTime === undefined ? Date.now() : Date.parse(req.body.endTime);

  TestDefinition.find({})
    .then((tests) => {
      const filteredDefinitions = tests.filter(
        (test) =>
          Date.parse("" + test.doneOn) >= startTime &&
          Date.parse("" + test.doneOn) <= endTime
      );

      const minimalDefinitions: MinimalDefinition[] = [];
      filteredDefinitions.forEach((element) => {
        const minimalDefinition = {
          _id: element._id,
          tester: element.tester,
          createdOn: element.createdOn,
          deadline: element.deadline,
          doneOn: element.doneOn,
          finished: element.finished,
          __v: element.__v,
          name: element.name,
          channelID: element.channelID,
        };
        minimalDefinitions.push(minimalDefinition);
      });
      res.json(minimalDefinitions);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// get minimal Tests in a time period for a specific channel
function getMinimalTestDefinitionsByTimePeriodAndChannelId(req: any, res: any) {
  const channelID = req.params.channelID;
  const startTime = Date.parse(req.body.startTime);
  const endTime =
    req.body.endTime === undefined ? Date.now() : Date.parse(req.body.endTime);

  TestDefinition.find({})
    .where("channelID")
    .equals(channelID)
    .then((tests) => {
      const filteredDefinitions = tests.filter(
        (test) =>
          Date.parse("" + test.doneOn) >= startTime &&
          Date.parse("" + test.doneOn) <= endTime
      );

      const minimalDefinitions: MinimalDefinition[] = [];
      filteredDefinitions.forEach((element) => {
        const minimalDefinition = {
          _id: element._id,
          tester: element.tester,
          createdOn: element.createdOn,
          deadline: element.deadline,
          doneOn: element.doneOn,
          finished: element.finished,
          __v: element.__v,
          name: element.name,
          channelID: element.channelID,
        };
        minimalDefinitions.push(minimalDefinition);
      });
      res.json(minimalDefinitions);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = {
  getMinimalTestDefinitions,
  getMinimalTestDefinitionsByTester,
  getMinimalTestDefinitionsByChannel,
  getMinimalTestDefinitionsByTimePeriod,
  getMinimalTestDefinitionsByTimePeriodAndChannelId,
};
