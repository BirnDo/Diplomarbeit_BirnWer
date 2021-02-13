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
