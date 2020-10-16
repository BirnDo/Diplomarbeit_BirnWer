import * as React from "react";
import * as _ from "lodash";

import SuccessIcon from "../../../../assets/SvgIcoSuccess";
import FailureIcon from "../../../../assets/SvgIcoFailure";
import styles from "./TestCase.module.scss";
import TestCaseModel from "../model/TestCaseModel";

export interface ITestCaseProps {
  key: number;
  index: number;
  onclick: any;
  testCase: TestCaseModel;
}
export interface ITestCaseState {
  active: boolean;
}

export default class TestCase extends React.Component<
  ITestCaseProps,
  ITestCaseState
> {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };
  }

  updateStatus = (index: number, testCase: TestCaseModel, status: boolean) => {
    const newTestCase = testCase;
    testCase.status = status;
    this.props.onclick(newTestCase, index);
  };

  public render(): React.ReactElement<ITestCaseProps> {
    const { testCase, index } = this.props;

    const renderStatusButton = () => {
      if (testCase.status == null) {
        return (
          <div className={styles.Button}>
            <div className={styles.Group}>
              <SuccessIcon
                onClick={() => {
                  this.updateStatus(index, testCase, true);
                }}
              />
              <FailureIcon
                onClick={() => {
                  this.updateStatus(index, testCase, false);
                }}
              />
            </div>
          </div>
        );
      }
      return <></>;
    };

    const renderStatus = () => {
      if (testCase.status != null) {
        if (testCase.status) return <SuccessIcon className={styles.Status} />;
        else return <FailureIcon className={styles.Status} />;
      }
      return <></>;
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
