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
}
interface ITestRunState extends TestRunModel {
  showDialog: boolean;
}

const columnPropsVertical: Partial<IStackProps> = {
  tokens: { childrenGap: 5 },
  styles: { root: { width: 500 } },
};

const columnPropsHorizontal: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 500 } },
};

class TestRun extends React.Component<ITestRunProps, ITestRunState> {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      name: null,
      createdOn: null,
      deadline: null,
      testCases: null,
      channelID: null,
      finished: null,
      showDialog: false,
      tester: null,
    };
  }

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

  async updateTestRun() {
    const testRun = this.state;

    const url = "http://localhost:3000/updateTestDefinition/" + testRun._id;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(testRun),
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
      deadline,
      testCases,
    } = this.state;

    finished = null; // reset the finished flag
    createdOn = new Date().toISOString();
    testCases.forEach((element) => {
      // reset all test case changes
      element.status = null;
      element.active = false;
      element.comments = "";
      element.description = "";
    });
    testCases[0].active = true; // set first test case to be active

    const url = "http://localhost:3000/addTestDefinition";
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
        this.props["history"].push("/runTest/" + body._id);
      })
      .catch((rejected) => console.log(rejected));
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
      this.updateActiveStatus(index, false);

      if (testCase.status == "successful") {
        if (index == this.state.testCases.length - 1)
          this.setState({ finished: true });
        else this.updateActiveStatus(index + 1, true);
      } else {
        this.setState({ finished: false });
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

  renderTestCases() {
    const { testCases } = this.state;
    let renderedTestCases: React.ReactElement[] = [];

    {
      testCases.map((value, index) => {
        renderedTestCases.push(
          <div key={index}>
            <TestCase
              key={index}
              index={index}
              testCase={value}
              updateTestCase={this.updateTestCase}
              updateActiveStatus={this.updateActiveStatus}
            />
          </div>
        );
      });
    }

    return renderedTestCases;
  }

  showlDialog = () => {
    this.setState({ showDialog: true });
  };

  hideDialog = () => {
    this.setState({ showDialog: false });
  };

  renderSaveButton(): React.ReactNode {
    if (this.state.finished == null)
      return (
        <PrimaryButton
          disabled={false}
          checked={false}
          text="Test abspeichern"
          onClick={this.showlDialog}
          allowDisabledFocus={true}
        />
      );
  }

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
    return (
      <>
        <Stack {...columnPropsVertical}>
          <Label>Erstellt am: {new Date(createdOn).toLocaleDateString()}</Label>
          <Label>Deadline: {new Date(deadline).toLocaleDateString()}</Label>

          {this.renderTestCases()}
          {/* <ListView
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
              onClick={() => {
                this.copyTestRun();
              }}
              allowDisabledFocus={true}
            />
          </Stack>
        </Stack>
        <Dialog
          hidden={!this.state.showDialog}
          onDismiss={this.hideDialog}
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
                this.hideDialog();
                this.updateTestRun();
              }}
              text="Speichern"
            />
            <DefaultButton onClick={this.hideDialog} text="Abbrechen" />
          </DialogFooter>
        </Dialog>
      </>
    );
  }
}

export default withRouter(TestRun);

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
