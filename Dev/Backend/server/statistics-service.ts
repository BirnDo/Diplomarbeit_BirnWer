import TestDefinition, { TestCase } from "./testDefinition-model";

// get Success statistics for all tests
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

// get Success statistics for all tests from one channel
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

// get Success statistics for all testcases
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

// get Success statistics for all testcases from one channel
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

module.exports = {
  getSuccessStatistics,
  getSuccessStatisticsByChannelId,
  getTestCaseSuccessStatistics,
  getTestCaseSuccessStatisticsByChannelId,
};
