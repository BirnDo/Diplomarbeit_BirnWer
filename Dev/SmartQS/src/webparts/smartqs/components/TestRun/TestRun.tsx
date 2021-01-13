import * as React from "react";
import * as _ from "lodash";
import { withRouter } from "react-router-dom";

import TestCase from "../TestCase/TestCase";
import TestCaseModel from "../model/TestCaseModel";
import TestRunModel from "../model/TestRunModel";

interface ITestRunProps {}
interface ITestRunState extends TestRunModel {}

class TestRun extends React.Component<ITestRunProps, ITestRunState> {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      name: null,
      createdOn: null,
      deadline: null,
      testCases: null,
      tester: null,
      finished: null,
    };
  }

  componentDidMount() {
    this.getTestRun();
  }

  componentDidUpdate() {
    const newId: string = this.props["match"]["params"]["id"];
    const oldId: string = this.state._id;

    if (newId != oldId) {
      this.updateTestCases(this.state);
      this.getTestRun();
    }
  }

  updateTestCases(testRun: TestRunModel) {
    const url = "http://localhost:3000/updateTestDefinition/";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(testRun),
    };

    fetch(url, requestOptions)
      .then(async (response) => {
        console.log("testrun updated");
      })
      .catch((rejected) => console.log(rejected));
  }

  async getTestRun() {
    const id = this.props["match"]["params"]["id"];
    console.log("getTestRun");
    if (id != null) {
      console.log("request");
      const url = "http://localhost:3000/testDefinitionById/" + id;
      const requestOptions = {
        method: "GET",
        headers: { Accept: "application/json" },
      };

      fetch(url, requestOptions)
        .then(async (response) => {
          const body: TestRunModel = await response.json();
          this.setState({
            _id: body._id,
            name: body.name,
            createdOn: body.createdOn,
            deadline: body.deadline,
            testCases: body.testCases,
            tester: body.tester,
            finished: body.finished,
          });
        })
        .catch((rejected) => console.log(rejected));
    }
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
      if (index == this.state.testCases.length - 1) {
        // if last test case, all test cases are updated on database
        this.updateActiveStatus(index, false);
        this.updateTestCases(this.state);
      }
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
    const { _id, name, createdOn, testCases } = this.state;

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
