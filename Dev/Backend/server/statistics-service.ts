import TestDefinition, { TestCase } from "./testDefinition-model";

/**
 * Returns the Success Statistics for all tests
 * @author Dominik Birngruber
 * @param req
 * @param res
 */
function getSuccessStatistics(req: any, res: any) {
  TestDefinition.find({})
    .then((tests) => {
      var successful = 0;
      var failed = 0;
      var notDone = 0;

      tests.forEach((test) => {
        if (test.finished == true) {
          successful++;
        } else if (test.finished == false) {
          failed++;
        } else {
          notDone++;
        }
      });

      res.json({ successful, failed, notDone });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

/**
 * Returns the success statistics for all tests of a single channel
 * @author Dominik Birngruber
 * @param req The request with the channelID in the path
 * @param res
 */
function getSuccessStatisticsByChannelId(req: any, res: any) {
  const channelID = req.params.channelID;
  TestDefinition.find({})
    .where("channelID")
    .equals(channelID)
    .then((tests) => {
      var successful = 0;
      var failed = 0;
      var notDone = 0;

      tests.forEach((test) => {
        if (test.finished == true) {
          successful++;
        } else if (test.finished == false) {
          failed++;
        } else {
          notDone++;
        }
      });

      res.json({ successful, failed, notDone });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

/**
 * Returns the success statistics for all tests in the given time period
 * @author Dominik Birngruber
 * @param req The request with the startDate and endDate in the body. If no endDate is given, it defaults to the current date
 * @param res
 */
function getSuccessStatisticsByTimePeriod(req: any, res: any) {
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

      var successful = 0;
      var failed = 0;
      var notDone = 0;

      filteredDefinitions.forEach((test) => {
        if (test.finished == true) {
          successful++;
        } else if (test.finished == false) {
          failed++;
        } else {
          notDone++;
        }
      });

      res.json({ successful, failed, notDone });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

/**
 * Returns the success statistics for all tests in the given time period of a single channel
 * @author Dominik Birngruber
 * @param req The request with the channelID in the path and the startDate and endDate in the body. If no endDate is given, it defaults to the current date
 * @param res
 */
function getSuccessStatisticsByTimePeriodAndChannelId(req: any, res: any) {
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

      var successful = 0;
      var failed = 0;
      var notDone = 0;

      filteredDefinitions.forEach((test) => {
        if (test.finished == true) {
          successful++;
        } else if (test.finished == false) {
          failed++;
        } else {
          notDone++;
        }
      });

      res.json({ successful, failed, notDone });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

/**
 * Returns the success statistics of all Test Cases
 * @author Dominik Birngruber
 * @param req
 * @param res
 */
function getTestCaseSuccessStatistics(req: any, res: any) {
  var allTestCases: TestCase[] = [];

  TestDefinition.find({})
    .then((tests) => {
      tests.forEach((test) => {
        test.testCases.forEach((testCase) => {
          allTestCases.push(testCase);
        });
      });
    })
    .then(() => {
      var successful = 0;
      var failed = 0;
      var notDone = 0;
      var optional = 0;

      allTestCases.forEach((testCase) => {
        if (testCase.status == "successful") {
          successful++;
        } else if (testCase.status == "faulty") {
          failed++;
        } else if (testCase.status == "optional") {
          optional++;
        } else {
          notDone++;
        }
      });

      res.json({ successful, failed, optional, notDone });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

/**
 * Returns the success statitsics of the Test Cases for the given channel
 * @author Dominik Birngruber
 * @param req The request with the channelID in the path
 * @param res
 */
function getTestCaseSuccessStatisticsByChannelId(req: any, res: any) {
  var allTestCases: TestCase[] = [];
  const channelID = req.params.channelID;

  TestDefinition.find({})
    .where("channelID")
    .equals(channelID)
    .then((tests) => {
      tests.forEach((test) => {
        test.testCases.forEach((testCase) => {
          allTestCases.push(testCase);
        });
      });
    })
    .then(() => {
      var successful = 0;
      var failed = 0;
      var notDone = 0;
      var optional = 0;

      allTestCases.forEach((testCase) => {
        if (testCase.status == "successful") {
          successful++;
        } else if (testCase.status == "faulty") {
          failed++;
        } else if (testCase.status == "optional") {
          optional++;
        } else {
          notDone++;
        }
      });

      res.json({ successful, failed, optional, notDone });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

/**
 * Returns the success statistics of the Test Cases for the given time period
 * @author Dominik Birngruber
 * @param req The request with the startDate and endDate in the body. If no endDate is given it defaults to the current date.
 * @param res
 */
function getTestCaseSuccessStatisticsByTimePeriod(req: any, res: any) {
  var allTestCases: TestCase[] = [];
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

      filteredDefinitions.forEach((test) => {
        test.testCases.forEach((testCase) => {
          allTestCases.push(testCase);
        });
      });

      var successful = 0;
      var failed = 0;
      var notDone = 0;
      var optional = 0;

      allTestCases.forEach((testCase) => {
        if (testCase.status == "successful") {
          successful++;
        } else if (testCase.status == "faulty") {
          failed++;
        } else if (testCase.status == "optional") {
          optional++;
        } else {
          notDone++;
        }
      });

      res.json({ successful, failed, optional, notDone });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

/**
 * Returns the success statistics of the Test Cases for the given time period and the given channel
 * @author Dominik Birngruber
 * @param req The request with the startDate and endDate in the body and the channelID in th path. If no endDate is given, it defaults to the current date.
 * @param res
 */
function getTestCaseSuccessStatisticsByTimePeriodAndChannelId(
  req: any,
  res: any
) {
  var allTestCases: TestCase[] = [];
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
      filteredDefinitions.forEach((test) => {
        test.testCases.forEach((testCase) => {
          allTestCases.push(testCase);
        });
      });

      var successful = 0;
      var failed = 0;
      var notDone = 0;
      var optional = 0;

      allTestCases.forEach((testCase) => {
        if (testCase.status == "successful") {
          successful++;
        } else if (testCase.status == "faulty") {
          failed++;
        } else if (testCase.status == "optional") {
          optional++;
        } else {
          notDone++;
        }
      });

      res.json({ successful, failed, optional, notDone });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = {
  getSuccessStatistics,
  getSuccessStatisticsByChannelId,
  getSuccessStatisticsByTimePeriod,
  getSuccessStatisticsByTimePeriodAndChannelId,
  getTestCaseSuccessStatistics,
  getTestCaseSuccessStatisticsByChannelId,
  getTestCaseSuccessStatisticsByTimePeriod,
  getTestCaseSuccessStatisticsByTimePeriodAndChannelId,
};
