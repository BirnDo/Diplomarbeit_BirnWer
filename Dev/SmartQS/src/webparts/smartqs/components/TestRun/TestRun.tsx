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
} from "office-ui-fabric-react";
import {
  ListView,
  IViewField,
  SelectionMode,
  GroupOrder,
  IGrouping,
} from "@pnp/spfx-controls-react/lib/ListView";

import TestCase from "../TestCase/TestCase";
import TestCaseModel from "../model/TestCaseModel";
import TestRunModel from "../model/TestRunModel";

interface ITestRunProps {}
interface ITestRunState extends TestRunModel {}

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
      //this.updateTestCases(this.state);
      this.getTestRun();
    }
  }

  updateTestRun(testRun: TestRunModel) {
    const id: string = this.props["match"]["params"]["id"];
    const url = "http://localhost:3000/updateTestDefinition/" + id;
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
        this.updateActiveStatus(index, false);
        this.setState({ finished: true });
        //this.updateTestCases(this.state);
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

  public render(): React.ReactElement<ITestRunProps> {
    const {
      _id,
      name,
      createdOn,
      deadline,
      testCases,
      tester,
      finished,
    } = this.state;

    if (_id == null) return <></>;
    const viewFields: IViewField[] = [
      {
        name: "title",
        displayName: "Title",
        isResizable: true,
        sorting: true,
        minWidth: 0,
        maxWidth: 150,
      },
      {
        name: "description",
        displayName: "Beschreibung",
        isResizable: true,
        sorting: true,
        minWidth: 0,
        maxWidth: 200,
      },
      {
        name: "comments",
        displayName: "Comment",
        isResizable: true,
        sorting: true,
        minWidth: 0,
        maxWidth: 200,
      },
    ];
    let data: TestCaseModel[] = [
      {
        title: "1",
        description: "beschreibung",
        status: null,
        active: null,
        comments: "comment",
        image: "",
      },
    ];
    return (
      <Stack {...columnPropsVertical}>
        <Label>Erstellt am: {new Date(createdOn).toLocaleDateString()}</Label>
        <Label>Deadline: {new Date(deadline).toLocaleDateString()}</Label>

        {/* this.renderTestCases() */}
        <ListView
          items={data}
          viewFields={viewFields}
          iconFieldName="ServerRelativeUrl"
          compact={false}
          selectionMode={SelectionMode.none}
          showFilter={false}
          dragDropFiles={false}
          stickyHeader={true}
        />
        <Stack horizontal {...columnPropsHorizontal}>
          <PrimaryButton
            disabled={false}
            checked={false}
            text="Test abspeichern"
            onClick={() => {
              this.updateTestRun(this.state);
            }}
            allowDisabledFocus={true}
          />
        </Stack>
      </Stack>
    );
  }
}

export default withRouter(TestRun);
