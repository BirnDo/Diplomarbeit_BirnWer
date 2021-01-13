import * as React from "react";
import * as _ from "lodash";

import styles from "./TestRunForms.module.scss";
import {
  TextField,
  MaskedTextField,
} from "office-ui-fabric-react/lib/TextField";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
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

import TestCaseModel from "../model/TestCaseModel";
import TestRunModel from "../model/TestRunModel";

interface ITestRunFormsProps {}
interface ITestRunFormsState extends TestRunModel {}

enum TestCaseInputType {
  title = "title",
  description = "description",
}

const columnPropsVertical: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 200 } },
};

const columnPropsHorizontal: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 500 } },
};

export default class TestRunForms extends React.Component<
  ITestRunFormsProps,
  ITestRunFormsState
> {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      name: "",
      tester: "",
      createdOn: new Date().toISOString(),
      deadline: null,
      finished: false,
      testCases: [
        {
          title: "",
          description: "",
          status: null,
          active: true,
          comments: "",
          image: "",
        },
      ],
    };
  }

  updateTestRun() {
    const {
      name,
      createdOn,
      tester,
      finished,
      deadline,
      testCases,
    } = this.state;

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
        tester,
        finished,
        deadline,
        testCases,
      }),
    };

    fetch(url, requestOptions)
      .then(async (response) => {
        const body = await response.json();
        console.log(body);
      })
      .catch((rejected) => console.log(rejected));
  }

  addTestCase() {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases.push({
      title: "",
      description: "",
      status: null,
      active: false,
      comments: "",
      image: "",
    });
    this.setState({ testCases: newTestCases });
  }

  removeTestCase() {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases.pop();
    this.setState({ testCases: newTestCases });
  }

  updateTestCases(index: number, value: string, type: TestCaseInputType) {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases[index][type] = value;
    this.setState({ testCases: newTestCases });
  }

  handleRichText(index: number, text: string) {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases[index].description = text;
    this.setState({ testCases: newTestCases });
    return text;
  }

  renderTestCases() {
    let testCases: TestCaseModel[] = this.state.testCases;
    let renderedTestCases: React.ReactElement[] = [];

    testCases.map((value, index) => {
      renderedTestCases.push(
        <div key={index}>
          <Label>
            <b>{index + 1 + ". Testfall"}</b>
          </Label>

          <Stack horizontal {...columnPropsHorizontal}>
            <TextField
              value={value.title}
              onChange={(value) => {
                this.updateTestCases(
                  index,
                  value.target["value"],
                  TestCaseInputType.title
                );
              }}
              label="Titel"
            />
            <Stack>
              <Label>Beschreibung</Label>
              <RichText
                className={styles.RichText}
                value={value.description}
                onChange={(value) => this.handleRichText(index, value)}
              />
            </Stack>
          </Stack>
        </div>
      );
    });

    return renderedTestCases;
  }

  public render(): React.ReactElement<ITestRunFormsProps> {
    return (
      <>
        <Stack {...columnPropsVertical}>
          <TextField
            onChange={(value) => {
              this.setState({ name: value.target["value"] });
            }}
            label="Test-Name"
          />
          <TextField
            onChange={(value) => {
              this.setState({ tester: value.target["value"] });
            }}
            label="Tester"
          />
          {this.renderTestCases()}
          <Stack horizontal {...columnPropsHorizontal}>
            <PrimaryButton
              disabled={false}
              checked={false}
              text="Testfall hinzufügen"
              onClick={() => {
                this.addTestCase();
              }}
              allowDisabledFocus={true}
            />
            <DefaultButton
              disabled={false}
              checked={false}
              text="Testfall entfernen"
              onClick={() => {
                this.removeTestCase();
              }}
              allowDisabledFocus={true}
            />
          </Stack>
          <DefaultButton
            disabled={false}
            checked={false}
            text="Test abspeichern"
            onClick={() => {
              this.updateTestRun();
            }}
            allowDisabledFocus={true}
          />
        </Stack>
      </>
    );
  }
}
