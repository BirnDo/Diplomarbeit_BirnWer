import TestDefinition, { MinimalDefinition } from "./testDefinition-model";
import { ReadPreference } from "mongodb";

/**
 * Resturns all Minimal Test Definitions
 * @author Dominik Birngruber
 * @param req
 * @param res
 */
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

/**
 * Returns all Minimal Test Definitions for a single tester
 * @deprecated
 * @author Dominik Birngruber
 * @param req Th request with the tester in the path
 * @param res
 */
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

/**
 * Returns all Minimal Test Definitions for a channel
 * @author Dominik Birngruber
 * @param req The request with the channelID in the path
 * @param res
 */
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

/**
 * Returns all Minmal Test Definitions done in the given time period
 * @author Dominik Birngruber
 * @param req The request with the startDate and endDate in the body. If no endDate is given, it defaults to the current date.
 * @param res
 */
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

/**
 * Returns all Minimal Test Definitions done in the given time period for the given channel
 * @author Dominik Birngruber
 * @param req The request with the startDate and endDate in the bdoy and the channelID in the path. If no endDate is given it defaults to the current date
 * @param res
 */
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
