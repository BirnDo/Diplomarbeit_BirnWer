import * as React from "react";
import * as _ from "lodash";

import SuccessIcon from "../../../../assets/SvgIcoSuccess";
import FailureIcon from "../../../../assets/SvgIcoFailure";
import styles from "./TestCase.module.scss";
import TestCaseModel from "../model/TestCaseModel";

export interface ITestCaseProps {
  key: number;
  index: number;
  testCase: TestCaseModel;
  updateTestCase: (index: number, testCase: TestCaseModel) => void;
  updateActiveStatus: (index: number, active: boolean) => void;
}
export interface ITestCaseState {}

export default class TestCase extends React.Component<
  ITestCaseProps,
  ITestCaseState
> {
  constructor(props) {
    super(props);
  }

  /**
   * used to update the status of the current test case
   *
   * @param {number} index current index of the test run arry to specify the element
   * @param {TestCaseModel} testCase current test case to pass the changes
   * @param {boolean} status used to specify the value the test status should have
   * @memberof TestCase
   */
  updateTestStatus = (
    index: number,
    testCase: TestCaseModel,
    status: boolean
  ) => {
    const newTestCase = testCase;
    testCase.status = status;
    this.props.updateTestCase(index, newTestCase);

    this.props.updateActiveStatus(index, false); // sets active status of current Test Case to false
    this.props.updateActiveStatus(index + 1, true); // sets active status of next Test Case to true
  };

  public render(): React.ReactElement<ITestCaseProps> {
    const { testCase, index } = this.props;

    /**
     * renders the status button for each test case
     * only visible when the test status is null and the active status is true
     *
     * @return {*}
     */
    const renderStatusButton = () => {
      if (testCase.status == null && testCase.active == true) {
        return (
          <div className={styles.Button}>
            <div className={styles.Group}>
              <SuccessIcon
                onClick={() => {
                  this.updateTestStatus(index, testCase, true); // sets the status of the current test case to true
                }}
              />
              <FailureIcon
                onClick={() => {
                  this.updateTestStatus(index, testCase, false); // sets the status of the current test case to false
                }}
              />
            </div>
          </div>
        );
      }
    };

    /**
     * renders either a success or failure icon
     * only visible when test status has a value
     *
     * @return {*}
     */
    const renderStatus = () => {
      if (testCase.status != null) {
        if (testCase.status) return <SuccessIcon className={styles.Status} />;
        else return <FailureIcon className={styles.Status} />;
      }
    };

    return (
      <div className={styles.Element}>
        <div className={styles.Content}>
          <div className={styles.Counter}>{index + 1}</div>
          <div className={styles.Text}>{testCase.title}</div>
          {renderStatus()}
        </div>
        {renderStatusButton()}
      </div>
    );
  }
}
