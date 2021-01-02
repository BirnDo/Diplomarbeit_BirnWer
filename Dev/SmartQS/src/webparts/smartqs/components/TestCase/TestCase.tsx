import * as React from "react";
import * as _ from "lodash";
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Toggle,
  Modal,
  IDragOptions,
  IconButton,
  IIconProps,
  ThemeSettingName,
  values,
} from "office-ui-fabric-react";
import { useId, useBoolean } from "@uifabric/react-hooks";
import {
  Dialog,
  DialogType,
  DialogFooter,
} from "office-ui-fabric-react/lib/Dialog";
import {
  PrimaryButton,
  DefaultButton,
} from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

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

export interface ITestCaseState {
  showModel: boolean;
  showDialog: boolean;
  message: string;
}

export default class TestCase extends React.Component<
  ITestCaseProps,
  ITestCaseState
> {
  constructor(props) {
    super(props);

    this.state = {
      showModel: false,
      showDialog: false,
      message: "",
    };
  }

  showModal = () => {
    this.setState({ showModel: true });
  };

  hideModal = () => {
    this.setState({ showModel: false });
  };

  showDialog = () => {
    this.setState({ showDialog: true });
  };

  hideDialog = () => {
    this.setState({ showDialog: false });
  };

  /**
   * updates the value of the current test case and the active status of the current and following test case
   *
   * @param {number} index current index of the test run arry to specify the element
   * @param {TestCaseModel} testCase current test case to pass the changes
   * @param {boolean} status used to specify the value the test status should have
   * @memberof TestCase
   */
  updateTestStatus(index: number, testCase: TestCaseModel, status: boolean) {
    const newTestCase = testCase;
    testCase.status = status;
    this.props.updateTestCase(index, newTestCase);

    this.props.updateActiveStatus(index, false); // sets active status of current Test Case to false
    this.props.updateActiveStatus(index + 1, true); // sets active status of next Test Case to true
  }

  /**
   * renders the status button for each test case
   * only visible when the test status is null and the active status is true
   *
   * @return {*}
   */
  renderStatusButton(index: number, testCase: TestCaseModel) {
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
                this.showDialog();
              }}
            />
          </div>
        </div>
      );
    }
  }

  /**
   * renders either a success or failure icon
   * only visible when test status has a value
   *
   * @return {*}
   */
  renderStatus(testCase: TestCaseModel) {
    if (testCase.status != null) {
      if (testCase.status) return <SuccessIcon className={styles.Status} />;
      else return <FailureIcon className={styles.Status} />;
    }
  }

  handleRichText(text: string) {
    this.setState({ message: text });
    return text;
  }

  public render(): React.ReactElement<ITestCaseProps> {
    const { testCase, index } = this.props;
    const cancelIcon: IIconProps = { iconName: "Cancel" };
    const dialogContentProps = {
      type: DialogType.largeHeader,
      title: "Was hat nicht funktioniert?",
      subText: testCase.description,
    };
    const dialogStyles = {
      main: { maxWidth: "800px !important", width: "fit-content !important" },
    };
    const modelProps = {
      isBlocking: false,
      styles: dialogStyles,
    };

    return (
      <div className={styles.TestCase}>
        <div className={styles.Content}>
          <div className={styles.Counter}>{index + 1}</div>
          <div className={styles.Text} onClick={this.showModal}>
            {testCase.title}
          </div>
          {this.renderStatus(testCase)}
        </div>
        {this.renderStatusButton(index, testCase)}
        <Modal
          isOpen={this.state.showModel}
          onDismiss={this.hideModal}
          isBlocking={false}
          containerClassName={contentStyles.container}
        >
          <div className={contentStyles.header}>
            <span>{testCase.title}</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this.hideModal}
            />
          </div>
          <div className={contentStyles.body}>
            <p>{testCase.description}</p>
          </div>
        </Modal>
        <Dialog
          hidden={!this.state.showDialog}
          onDismiss={this.hideDialog}
          dialogContentProps={dialogContentProps}
          modalProps={modelProps}
        >
          <RichText onChange={(value) => this.handleRichText(value)} />
          <DialogFooter>
            <PrimaryButton
              onClick={() => {
                this.hideDialog();
                testCase.message = this.state.message;
                this.updateTestStatus(index, testCase, false); // sets the status of the current test case to false
              }}
              text="Save"
            />
            <DefaultButton onClick={this.hideDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    minWidth: "800px",
  },
  header: [
    //eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
