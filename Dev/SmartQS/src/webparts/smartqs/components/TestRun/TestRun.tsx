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

  updateTestCase = (index: number, testCase: TestCaseModel) => {
    const newTestCases = this.state.testCases.slice();
    newTestCases[index] = testCase;
    this.setState({ testCases: newTestCases });
  };

  public render(): React.ReactElement<ITestRunProps> {
    const { title, createdOn, testCases } = this.state;
    console.log("testCases", testCases);

    return (
      <>
        {testCases.map((value, index) => {
          return (
            <TestCase
              onclick={this.updateTestCase}
              key={index}
              index={index}
              testCase={value}
            />
          );
        })}
      </>
    );
  }
}
