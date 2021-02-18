import * as React from "react";
import * as _ from "lodash";
import { withRouter } from "react-router-dom";
import { Stack, IStackProps } from "office-ui-fabric-react/lib/Stack";
import {
  css,
  classNamesFunction,
  DefaultButton,
  IButtonProps,
  IStyle,
  Label,
  PrimaryButton,
  people,
  Dialog,
  getTheme,
  mergeStyleSets,
  DialogFooter,
  DialogType,
  FontWeights,
  DatePicker,
  IDatePickerStrings,
  DayOfWeek,
} from "office-ui-fabric-react";
import {
  ListView,
  IViewField,
  SelectionMode,
  GroupOrder,
  IGrouping,
} from "@pnp/spfx-controls-react/lib/ListView";
import { TextField } from "office-ui-fabric-react/lib/TextField";

import TestCase from "../TestCase/TestCase";
import TestCaseModel from "../../model/TestCaseModel";
import TestRunModel from "../../model/TestRunModel";
import { times } from "lodash";

interface ITestRunProps {
  reloadTestRunNav: () => void;
  readonly: boolean;
  serverURL: string;
}
interface ITestRunState extends TestRunModel {
  showTesterDialog: boolean;
  showCopyDialog: boolean;
  newDeadline: string;
}

const columnPropsVertical: Partial<IStackProps> = {
  tokens: { childrenGap: 5 },
  styles: { root: { width: 500 } },
};

const columnPropsHorizontal: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 500 } },
};

const DayPickerStrings: IDatePickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],

  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],

  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker",
};
class TestRun extends React.Component<ITestRunProps, ITestRunState> {
  constructor(props) {
    super(props);

    this.state = {
      doneOn: null,
      _id: null,
      name: null,
      createdOn: null,
      deadline: null,
      newDeadline: null,
      testCases: null,
      channelID: null,
      finished: null,
      showTesterDialog: false,
      showCopyDialog: false,
      tester: null,
    };
  }

  /* #region  react lifecycle methods */
  componentDidMount() {
    this.getTestRun();
  }

  componentDidUpdate() {
    const newId: string = this.props["match"]["params"]["id"];
    const oldId: string = this.state._id;

    if (newId != oldId) {
      //this.updateTestCases(this.state);
      this.getTestRun();
    }
  }
  /* #endregion */

  /* #region  database request methods */
  async updateTestRun() {
    const {
      _id,
      name,
      createdOn,
      deadline,
      testCases,
      channelID,
      finished,
      tester,
    } = this.state;

    let doneOn;
    if (finished != null) doneOn = new Date().toISOString();
    const url = this.props.serverURL + "/updateTestDefinition/" + _id;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id,
        name,
        createdOn,
        deadline,
        testCases,
        channelID,
        finished,
        tester,
        doneOn,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        this.props.reloadTestRunNav();
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }

  async getTestRun() {
    const id = this.props["match"]["params"]["id"];
    if (id != null) {
      const url = this.props.serverURL + "/testDefinitionById/" + id;
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
            channelID: body.channelID,
            finished: body.finished,
          });
          console.log(body);
        })
        .catch((rejected) => console.log(rejected));
    }
  }

  async copyTestRun() {
    let {
      name,
      createdOn,
      channelID,
      finished,
      newDeadline,
      deadline,
      testCases,
    } = this.state;
    const urlPath =
      "/" + this.props["history"]["location"]["pathname"].split("/")[1];

    finished = null; // reset the finished flag
    createdOn = new Date().toISOString();
    deadline = newDeadline;
    testCases.forEach((element) => {
      // reset all test case changes
      element.status = null;
      element.active = false;
      element.comments = "";
      element.description = "";
    });
    testCases[0].active = true; // set first test case to be active

    const url = this.props.serverURL + "/addTestDefinition";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        createdOn,
        channelID,
        finished,
        deadline,
        testCases,
      }),
    };

    fetch(url, requestOptions)
      .then(async (response) => {
        const body = await response.json();
        await this.props.reloadTestRunNav();
        this.props["history"].push(urlPath + "/" + body._id);
      })
      .catch((rejected) => console.log(rejected));
  }
  /* #endregion */

  /* #region  state helper methods */
  showTesterDialog = () => {
    this.setState({ showTesterDialog: true });
  };

  hideTesterDialog = () => {
    this.setState({ showTesterDialog: false });
  };

  showCopyDialog = () => {
    this.setState({ showCopyDialog: true });
  };

  hideCopyDialog = () => {
    this.setState({ showCopyDialog: false });
  };
  /* #endregion */

  /* #region  state management functions for external use */
  /**
   * updates a specific test case of a test run
   *
   * @param {number} index used to specify the test case
   * @param {TestCaseModel} testCase used to pass the values to the old test case
   * @memberof TestPlan
   */
  updateTestCase = (index: number, testCase: TestCaseModel) => {
    if (index < this.state.testCases.length) {
      const newTestCases = this.state.testCases.slice(); // creates a local copy of all test cases from state
      newTestCases[index] = testCase; // updates the specific test case with the passed value
      this.setState({ testCases: newTestCases }); // updates state with the updated test cases
      this.updateActiveStatus(index, false); // disables the activity status of the current test case

      if (testCase.status == "successful" || testCase.status == "optional") {
        // if the test case got either marked successful or optional
        if (index == this.state.testCases.length - 1) {
          // if current test case is the last test case
          this.setState({ finished: true }); // marks the test run as completed successfully
          this.showTesterDialog(); // prompts the user to enter the name of the tester
        } else {
          // if current test case is not the last element
          this.updateActiveStatus(index + 1, true); // next test case is be marked to be active
        }
      } else {
        // if the test case marked as faulty
        this.setState({ finished: false }); // the test run should be canceled and therefore the finished property gets updated to be faulty
        this.showTesterDialog(); // prompts the user to enter the name of the tester
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
  /* #endregion */

  /* #region  render helper methods */
  /**
   * renders all test cases given in the state
   *
   * @param {boolean} readonly
   * @return {*}  {React.ReactNode}
   * @memberof TestRun
   */
  renderTestCases(readonly: boolean): React.ReactNode {
    const { testCases } = this.state;
    let renderedTestCases: React.ReactElement[] = [];

    testCases.map((value, index) => {
      renderedTestCases.push(
        <div key={index}>
          <TestCase
            key={index}
            index={index}
            testCase={value}
            updateTestCase={this.updateTestCase}
            updateActiveStatus={this.updateActiveStatus}
            readonly={readonly}
          />
        </div>
      );
    });

    return renderedTestCases;
  }

  /**
   * conditional render method
   * renders the save button only if the test run is not yet done
   *
   * @return {*}  {React.ReactNode}
   * @memberof TestRun
   */
  renderSaveButton(): React.ReactNode {
    const { finished } = this.state;

    if (finished == null)
      return (
        <PrimaryButton
          disabled={false}
          checked={false}
          text="Test abspeichern"
          onClick={this.showTesterDialog}
          allowDisabledFocus={true}
        />
      );
  }

  /**
   * conditional render method
   * only renders the deadline of the test run if the test run is not yet done
   * @return {*}  {React.ReactNode}
   * @memberof TestRun
   */
  renderDeadline(): React.ReactNode {
    const { deadline, finished } = this.state;
    if (finished == null)
      return <Label>Frist: {new Date(deadline).toLocaleDateString()}</Label>;
  }
  /* #endregion */

  public render(): React.ReactElement<ITestRunProps> {
    const {
      _id,
      name,
      createdOn,
      deadline,
      testCases,
      channelID,
      finished,
    } = this.state;

    const dialogStyles = {
      main: {
        maxWidth: "1000px !important",
        width: "fit-content !important",
      },
    };
    const modelProps = {
      isBlocking: false,
      styles: dialogStyles,
    };

    if (_id == null) return <></>;
    if (this.props.readonly == true)
      return (
        <Stack {...columnPropsVertical}>{this.renderTestCases(true)}</Stack>
      );
    else
      return (
        <>
          <Stack {...columnPropsVertical}>
            {this.renderDeadline()}
            {this.renderTestCases(false)}
            {/* <ListView // list view not working as react version is probably outdated
          items={data}
          viewFields={viewFields}
          iconFieldName="ServerRelativeUrl"
          compact={false}
          selectionMode={SelectionMode.none}
          showFilter={false}
          dragDropFiles={false}
          stickyHeader={true}
        /> */}
            <Stack horizontal {...columnPropsHorizontal}>
              {this.renderSaveButton()}
              <DefaultButton
                disabled={false}
                checked={false}
                text="Test erneut durchführen"
                onClick={this.showCopyDialog}
                allowDisabledFocus={true}
              />
            </Stack>
          </Stack>
          <Dialog
            hidden={!this.state.showTesterDialog}
            onDismiss={this.hideTesterDialog}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: "Wer hat den Test durchgeführt?",
            }}
            modalProps={modelProps}
          >
            <TextField
              onChange={(value) => {
                this.setState({ tester: value.target["value"] });
              }}
            />
            <DialogFooter>
              <PrimaryButton
                onClick={() => {
                  this.hideTesterDialog();
                  this.updateTestRun();
                }}
                text="Speichern"
              />
              <DefaultButton onClick={this.hideTesterDialog} text="Abbrechen" />
            </DialogFooter>
          </Dialog>
          <Dialog
            hidden={!this.state.showCopyDialog}
            onDismiss={this.hideCopyDialog}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: "Was ist die neue Frist?",
            }}
            modalProps={modelProps}
          >
            <DatePicker
              firstDayOfWeek={DayOfWeek.Monday}
              strings={DayPickerStrings}
              placeholder="Datum auswählen"
              ariaLabel="Select a date"
              label="Frist"
              onSelectDate={(e) => {
                this.setState({ newDeadline: e.toISOString() });
              }}
            />
            <DialogFooter>
              <PrimaryButton
                onClick={() => {
                  this.hideCopyDialog();
                  this.copyTestRun();
                }}
                text="Speichern"
              />
              <DefaultButton onClick={this.hideCopyDialog} text="Abbrechen" />
            </DialogFooter>
          </Dialog>
        </>
      );
  }
}

/* #region  styling for fluent ui components */
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
/* #endregion */

export default withRouter(TestRun);
