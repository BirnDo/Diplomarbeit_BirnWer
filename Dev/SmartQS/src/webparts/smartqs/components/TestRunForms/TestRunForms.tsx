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

interface ITestRunFormsProps {}
interface ITestRunFormsState {
  title: string;
  people: string;
  createdOn: string;
  testCases: TestCaseModel[];
}
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
      title: null,
      people: "",
      createdOn: new Date().toISOString(),
      testCases: [
        { title: "", description: "", status: null, active: true, message: "" },
      ],
    };
  }

  updateTestRun() {
    const { title, people, createdOn, testCases } = this.state;
    // update database
  }

  addTestCase() {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases.push({
      title: "",
      description: "",
      status: null,
      active: false,
      message: "",
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
              this.setState({ title: value.target["value"] });
            }}
            label="Test-Name"
          />
          <TextField
            onChange={(value) => {
              this.setState({ people: value.target["value"] });
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
