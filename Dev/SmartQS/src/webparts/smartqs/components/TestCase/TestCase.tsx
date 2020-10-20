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

  updateTestStatus = (
    index: number,
    testCase: TestCaseModel,
    status: boolean
  ) => {
    const newTestCase = testCase;
    testCase.status = status;
    this.props.updateTestCase(index, newTestCase);
    this.props.updateActiveStatus(index, false);
    this.props.updateActiveStatus(index + 1, true);
  };

  public render(): React.ReactElement<ITestCaseProps> {
    const { testCase, index } = this.props;

    const renderStatusButton = () => {
      if (testCase.status == null && testCase.active == true) {
        return (
          <div className={styles.Button}>
            <div className={styles.Group}>
              <SuccessIcon
                onClick={() => {
                  this.updateTestStatus(index, testCase, true);
                }}
              />
              <FailureIcon
                onClick={() => {
                  this.updateTestStatus(index, testCase, false);
                }}
              />
            </div>
          </div>
        );
      }
    };

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
