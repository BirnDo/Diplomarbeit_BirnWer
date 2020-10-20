import * as React from "react";
import * as _ from "lodash";

import TestCase from "../TestCase/TestCase";
import TestCaseModel from "../model/TestCaseModel";
import TestRunModel from "../model/TestRunModel";

interface ITestRunProps {
  testRun: TestRunModel;
}
interface ITestRunState extends TestRunModel {}

export default class TestPlan extends React.Component<
  ITestRunProps,
  ITestRunState
> {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.testRun.title,
      createdOn: this.props.testRun.createdOn,
      testCases: this.props.testRun.testCases,
    };
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
    const { title, createdOn, testCases } = this.state;
    console.log("testCases", testCases);

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
