import TestDefinition, { TestCase } from "./testDefinition-model";
import { ReadPreference } from "mongodb";

/**
 * Returns all Test Definitions from the Database
 * @author Dominik Birngruber
 * @param req
 * @param res
 */
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

/**
 * Returns a single Test Defintion
 * @author Dominik Birngruber
 * @param req The request where a parameter named _id is included in the path
 * @param res
 */
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

/**
 * Creates a new Test Definition in the Database
 * @author Dominik Birngruber
 * @param req The request with all needed Parameters in the body
 * @param res
 */
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

/**
 * Updates a Test Definition
 * @author Dominik Birngruber
 * @param req The request with all parameters that need to be updatedi the body and the _id in the path, all body parameters are optional. If a webhook is given, a card gets sent to the teams channel.
 * @param res
 */
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
    webhook,
  } = req.body;

  if ((finished == true || finished == false) && webhook != undefined) {
    sendCard(name, testCases, tester, finished, webhook);
  }

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

/**
 * Sends a card to a teams webhook
 * @author Dominik Birngruber
 * @param name Name of the Test
 * @param testCases List of testcases
 * @param tester the tester who finished the test
 * @param finished wether the test was successful or not
 * @param webhook the webhook of the teams chat
 */
function sendCard(
  name: String,
  testCases: [TestCase],
  tester: String,
  finished: Boolean,
  webhook: String
) {
  var successful = 0;
  var failed = 0;
  var optional = 0;

  testCases.forEach((test) => {
    if (test.status == "successful") {
      successful++;
    } else if (test.status == "faulty") {
      failed++;
    } else if (test.status == "optional") {
      optional++;
    } else {
      optional++;
    }
  });

  const card = {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
          type: "AdaptiveCard",
          body: [
            {
              type: "TextBlock",
              size: "medium",
              weight: "bolder",
              text: name + " beendet",
            },
            {
              type: "TextBlock",
              text:
                name +
                " wurde von " +
                tester +
                " beendet. Der Test war " +
                (finished ? "erfolgreich" : "nicht erfogreich") +
                ".",
              wrap: true,
            },
            {
              type: "FactSet",
              facts: [
                {
                  title: "Erfolgreich",
                  value: successful + "",
                },
                {
                  title: "Fehlgeschlagen",
                  value: failed + "",
                },
                {
                  title: "Optional",
                  value: optional + "",
                },
              ],
            },
          ],
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          version: "1.2",
        },
      },
    ],
  };

  fetch(webhook + "", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(card),
  });
}

/**
 * Deletes the Test Definition with the given _id
 * @author Dominik Birngruber
 * @param req The request with the _id in the path
 * @param res
 */
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

/**
 * Returns all Test Cases from a Test Definition
 * @author Dominik Birngruber
 * @param req The request with the _id in the path
 * @param res
 */
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

/**
 * Returns all Test Definitions that are finished
 * @author Dominik Birngruber
 * @param req
 * @param res
 */
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

/**
 * Returns all Definitions for one Tester
 * @deprecated
 * @author Dominik Birngruber
 * @param req The request with the tester in the path
 * @param res
 */
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

/**
 * Returns all Tests for the given Channel
 * @author Dominik Birngruber
 * @param req The request with the channelID in the path
 * @param res
 */
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

/**
 * Returns all Test Definitions done in a given time period
 * @author Dominik Birngruber
 * @param req The request with the startDate and endDate in the body. If no endDate is given, it defaults to the current date
 * @param res
 */
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

/**
 * Returns all Test Definitions done in a given time period for one channel
 * @author Dominik Birngruber
 * @param req The request with the startDate and endDate in the body and the channelID in the path. If no endDate is given, it defaults to the current date.
 * @param res
 */
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
