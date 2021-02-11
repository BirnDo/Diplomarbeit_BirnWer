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
  Label,
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

import OptionalIcon from "../../../../assets/SvgIcoOptional";
import SuccessIcon from "../../../../assets/SvgIcoSuccess";
import FailureIcon from "../../../../assets/SvgIcoFailure";
import styles from "./TestCase.module.scss";
import TestCaseModel from "../../model/TestCaseModel";

export interface ITestCaseProps {
  key: number;
  index: number;
  testCase: TestCaseModel;
  readonly: boolean;
  updateTestCase: (index: number, testCase: TestCaseModel) => void;
  updateActiveStatus: (index: number, active: boolean) => void;
}

export interface ITestCaseState {
  showModel: boolean;
  showErrorDialog: boolean;
  showOptionalDialog: boolean;
  comments: string;
}

export default class TestCase extends React.Component<
  ITestCaseProps,
  ITestCaseState
> {
  constructor(props) {
    super(props);

    this.state = {
      showModel: false,
      showErrorDialog: false,
      showOptionalDialog: false,
      comments: "",
    };
  }

  showModal = () => {
    this.setState({ showModel: true });
  };

  hideModal = () => {
    this.setState({ showModel: false });
  };

  showErrorDialog = () => {
    this.setState({ showErrorDialog: true });
  };

  hideErrorDialog = () => {
    this.setState({ showErrorDialog: false });
  };

  showOptionalDialog = () => {
    this.setState({ showOptionalDialog: true });
  };

  hideOptionalDialog = () => {
    this.setState({ showOptionalDialog: false });
  };

  /**
   * updates the value of the current test case and the active status of the current and following test case
   *
   * @param {number} index current index of the test run array to specify the element
   * @param {TestCaseModel} testCase current test case to pass the changes
   * @param {boolean} status used to specify the value the test status should have
   * @memberof TestCase
   */
  updateTestStatus(index: number, testCase: TestCaseModel, status: string) {
    const newTestCase = testCase;
    testCase.status = status;
    this.props.updateTestCase(index, newTestCase);
  }

  /**
   * renders the status button for each test case
   * only visible when the test status is null and the active status is true
   *
   * @return {*}
   */
  renderStatusButton(index: number, testCase: TestCaseModel) {
    if (
      testCase.status == null &&
      testCase.active == true &&
      !this.props.readonly
    ) {
      return (
        <div className={styles.Button}>
          <div className={styles.Group}>
            <SuccessIcon
              onClick={() => {
                this.updateTestStatus(index, testCase, "successful"); // sets the status of the current test case to true
              }}
            />
            <FailureIcon
              onClick={() => {
                this.showErrorDialog();
              }}
            />
            {this.renderOptionalStatusButton(index, testCase)}
          </div>
        </div>
      );
    }
  }

  renderOptionalStatusButton(index: number, testCase: TestCaseModel) {
    if (!testCase.required)
      return (
        <OptionalIcon
          onClick={() => {
            this.showOptionalDialog();
          }}
        />
      );
  }

  /**
   * renders either a success or failure icon
   * only visible when test status has a value
   *
   * @return {*}
   */
  renderStatus(testCase: TestCaseModel) {
    if (testCase.status != null) {
      if (testCase.status == "successful")
        return <SuccessIcon className={styles.Status} />;
      else if (testCase.status == "faulty")
        return <FailureIcon className={styles.Status} />;
      else if (testCase.status == "optional")
        return <OptionalIcon className={styles.Status} />;
    }
  }

  renderErrorMessage(): React.ReactNode {
    const { testCase } = this.props;

    if (testCase.comments != "")
      return (
        <>
          <Label>Fehlermeldung</Label>
          <RichText isEditMode={false} value={testCase.comments} />
        </>
      );
  }

  renderPopups(): React.ReactNode {
    const { testCase, index, readonly } = this.props;

    const cancelIcon: IIconProps = { iconName: "Cancel" };
    const dialogStyles = {
      main: {
        maxWidth: "1000px !important",
        width: "fit-content !important",
        minWidth: "500px !important",
      },
    };
    const modelProps = {
      isBlocking: false,
      styles: dialogStyles,
    };
    if (readonly)
      return (
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
            <RichText isEditMode={false} value={testCase.description} />
            {this.renderErrorMessage()}
          </div>
        </Modal>
      );
    else
      return (
        <>
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
              <RichText isEditMode={false} value={testCase.description} />
            </div>
          </Modal>
          <Dialog
            hidden={!this.state.showErrorDialog}
            onDismiss={this.hideErrorDialog}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: "Was hat nicht funktioniert?",
            }}
            modalProps={modelProps}
          >
            {() => {
              console.log(testCase.description);
            }}
            <RichText isEditMode={false} value={testCase.description} />
            <RichText
              className={styles.RichText}
              onChange={(value) => this.handleRichText(value)}
            />
            <DialogFooter>
              <PrimaryButton
                onClick={() => {
                  this.hideErrorDialog();
                  testCase.comments = this.state.comments;
                  this.updateTestStatus(index, testCase, "faulty"); // sets the status of the current test case to false
                }}
                text="Speichern"
              />
              <DefaultButton onClick={this.hideErrorDialog} text="Abbrechen" />
            </DialogFooter>
          </Dialog>
          <Dialog
            hidden={!this.state.showOptionalDialog}
            onDismiss={this.hideOptionalDialog}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: "Warum ignorieren sie den Test?",
            }}
            modalProps={modelProps}
          >
            <RichText isEditMode={false} value={testCase.description} />
            <RichText
              className={styles.RichText}
              onChange={(value) => this.handleRichText(value)}
            />
            <DialogFooter>
              <PrimaryButton
                onClick={() => {
                  this.hideOptionalDialog();
                  testCase.comments = this.state.comments;
                  this.updateTestStatus(index, testCase, "optional"); // sets the status of the current test case to false
                }}
                text="Speichern"
              />
              <DefaultButton
                onClick={this.hideOptionalDialog}
                text="Abbrechen"
              />
            </DialogFooter>
          </Dialog>
        </>
      );
  }

  handleRichText(text: string) {
    this.setState({ comments: text });
    return text;
  }

  public render(): React.ReactElement<ITestCaseProps> {
    const { testCase, index } = this.props;

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
        {this.renderPopups()}
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
    minWidth: "500px",
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
