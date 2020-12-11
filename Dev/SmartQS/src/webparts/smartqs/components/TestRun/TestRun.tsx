import * as React from "react";
import * as _ from "lodash";
import { withRouter } from "react-router-dom";

import TestCase from "../TestCase/TestCase";
import TestCaseModel from "../model/TestCaseModel";
import TestRunModel from "../model/TestRunModel";

var dummyData: TestRunModel[] = [
  {
    _id: "0001",
    title: "Organisationsansicht",
    createdOn: "2020/10/02",
    testCases: [
      {
        title: "Öffnen Sie das Sharepoint",
        description:
          "Öffnen Sie das Sharepoint ihrer Firma. Loggen Sie sich anschließend mit ihren Micosoft Konto an und navigieren Sie zur Startseite.",
        status: null,
        active: true,
        message: "",
      },
      {
        title: "Öffnen Sie die Organisationsansicht",
        description:
          "Navigieren Sie zu den Favoriten auf dem Sharepoint. Drücken Sie dann auf die Organisationsansicht. Nun soll eine Liste aller Mitarbeiter mit den jeweiligen Kontaktinformation erscheinen.",
        status: null,
        active: false,
        message: "",
      },
      {
        title: "Testen Sie die Kontaktinformationen",
        description:
          "Drücken Sie auf alle Kontaktinformationen des ersten Mitarbeiters und testen Sie ob Sie zur richtigen Webseite weitergeleitet werden.",
        status: null,
        active: false,
        message: "",
      },
    ],
  },
  {
    _id: "0002",
    title: "Speiseplan",
    createdOn: "2020/10/04",
    testCases: [
      {
        title: "Öffnen Sie das Sharepoint",
        description:
          "Öffnen Sie das Sharepoint ihrer Firma. Loggen Sie sich anschließend mit ihren Micosoft Konto an und navigieren Sie zur Startseite.",
        status: null,
        active: true,
        message: "",
      },
      {
        title: "Öffnen Sie den Speiseplan",
        description:
          "Navigieren Sie zu den Favoriten auf dem Sharepoint. Drücken Sie dann auf den Speiseplan. Nun soll der heutige Speiseplan angezeigt werden.",
        status: null,
        active: false,
        message: "",
      },
      {
        title: "Testen Sie die anderen Orte",
        description:
          "Drücken Sie auf die anderen Orte und testen Sie ob der Speiseplan richtig angezeigt wird.",
        status: null,
        active: false,
        message: "",
      },
    ],
  },
];
interface ITestRunProps {}
interface ITestRunState extends TestRunModel {}

class TestRun extends React.Component<ITestRunProps, ITestRunState> {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      title: null,
      createdOn: null,
      testCases: null,
    };
  }

  componentDidMount() {
    this.updateRenderedTestRun();
  }

  componentDidUpdate() {
    const newId: string = this.props["match"]["params"]["id"];
    const oldId: string = this.state._id;

    if (newId != oldId) {
      this.updateTestCases(oldId);
      this.updateRenderedTestRun();
    }
  }

  updateRenderedTestRun() {
    const id = this.props["match"]["params"]["id"];
    if (id != null) {
      const testRun = this.getTestRunData(id);
      this.setState({
        _id: testRun._id,
        title: testRun.title,
        createdOn: testRun.createdOn,
        testCases: testRun.testCases,
      });
    }
  }

  updateTestCases(id: string) {
    // update database
  }

  getTestRunData(id: string): TestRunModel {
    // get from database
    return _.filter(dummyData, ["_id", id])[0];
  }

  /**
   * updates a specific test case of a test run
   *
   * @param {number} index used to specify the test case
   * @param {TestCaseModel} testCase used to pass the values to the old test case
   * @memberof TestPlan
   */
  updateTestCase = (index: number, testCase: TestCaseModel) => {
    if (index < this.state.testCases.length) {
      const newTestCases = this.state.testCases.slice();
      newTestCases[index] = testCase;
      this.setState({ testCases: newTestCases });
    }
  };

  /**
   * updates the active status of a specific test case of a test run
   *
   * @param {number} index used to specify the test case
   * @param {boolean} active used to specify the value the active status should have
   * @memberof TestPlan
   */
  updateActiveStatus = (index: number, active: boolean) => {
    if (index < this.state.testCases.length) {
      const newTestCases = this.state.testCases.slice();
      newTestCases[index].active = active;
      this.setState({ testCases: newTestCases });
    }
  };

  public render(): React.ReactElement<ITestRunProps> {
    const { _id, title, createdOn, testCases } = this.state;
    console.log("testCases", testCases);

    if (_id == null) return <></>;

    return (
      <>
        {testCases.map((value, index) => {
          return (
            <TestCase
              key={index}
              index={index}
              testCase={value}
              updateTestCase={this.updateTestCase}
              updateActiveStatus={this.updateActiveStatus}
            />
          );
        })}
      </>
    );
  }
}

export default withRouter(TestRun);
