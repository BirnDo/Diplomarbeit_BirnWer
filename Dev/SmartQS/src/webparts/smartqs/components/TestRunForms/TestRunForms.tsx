import * as React from "react";
import * as _ from "lodash";

import ReactDragListView from "react-drag-listview/lib/index.js";
import "./ListView.css";
import styles from "./TestRunForms.module.scss";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
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
  Checkbox,
  TextField,
  MaskedTextField,
} from "office-ui-fabric-react";
import {
  DatePicker,
  DayOfWeek,
  IDatePickerStrings,
} from "office-ui-fabric-react/lib/DatePicker";

import TestCaseModel from "../../model/TestCaseModel";
import TestRunModel from "../../model/TestRunModel";

interface ITestRunFormsProps {
  teamsContext: any;
}
interface ITestRunFormsState extends TestRunModel {
  showModal: boolean;
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
      showModal: false,
      _id: "",
      name: "",
      channelID: this.props.teamsContext
        ? this.props.teamsContext.channelId
        : null,
      createdOn: new Date().toISOString(),
      deadline: null,
      finished: null,
      testCases: [
        {
          title: "",
          description: "",
          status: null,
          active: false,
          comments: "",
          image: "",
          required: true,
        },
      ],
    };
  }

  async addTestRun() {
    const {
      name,
      createdOn,
      channelID,
      finished,
      deadline,
      testCases,
    } = this.state;

    testCases[0].active = true; // make first element be active

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
        console.log(body);
      })
      .catch((rejected) => console.log(rejected));
  }

  addTestCase() {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases.push({
      title: "",
      description: "",
      required: true,
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

  handleTitleText(index: number, value: string) {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases[index].title = value;
    this.setState({ testCases: newTestCases });
  }

  handleRichText(index: number, text: string) {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases[index].description = text;
    this.setState({ testCases: newTestCases });
    return text;
  }

  handleCheckbox(index: number, required: boolean) {
    let newTestCases: TestCaseModel[] = this.state.testCases;
    newTestCases[index].required = required;
    this.setState({ testCases: newTestCases });
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
            <Stack>
              <Label>Erforderlich</Label>
              <Checkbox
                checked={value.required}
                onChange={() => this.handleCheckbox(index, !value.required)}
              />
            </Stack>
            <Stack>
              <Label>Titel</Label>
              <TextField
                value={value.title}
                onChange={(value) => {
                  this.handleTitleText(index, value.target["value"]);
                }}
              />
            </Stack>
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

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  public render(): React.ReactElement<ITestRunFormsProps> {
    const that = this;
    const dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const data = [...that.state.testCases];
        const item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        that.setState({ testCases: data });
      },
      nodeSelector: "li",
      handleSelector: "a",
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
    const cancelIcon: IIconProps = { iconName: "Cancel" };

    console.log(this.state);
    return (
      <>
        <Stack {...columnPropsVertical}>
          <TextField
            onChange={(value) => {
              this.setState({ name: value.target["value"] });
            }}
            label="Test-Name"
          />
          <DatePicker
            firstDayOfWeek={DayOfWeek.Monday}
            strings={DayPickerStrings}
            placeholder="Datum auswählen"
            ariaLabel="Select a date"
            label="Frist"
            onSelectDate={(e) => {
              this.setState({ deadline: e.toISOString() });
            }}
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
            <PrimaryButton
              disabled={false}
              checked={false}
              text="Testfälle neu anordnen"
              onClick={() => {
                this.setState({ showModal: true });
              }}
              allowDisabledFocus={true}
            />
          </Stack>
          <DefaultButton
            disabled={false}
            checked={false}
            text="Test abspeichern"
            onClick={() => {
              this.addTestRun();
            }}
            allowDisabledFocus={true}
          />
          <Modal
            isOpen={this.state.showModal}
            onDismiss={this.hideModal}
            isBlocking={false}
            containerClassName={contentStyles.container}
          >
            <div className={contentStyles.header}>
              <span>Testfälle neu anordnen</span>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={this.hideModal}
              />
            </div>
            <div className={contentStyles.body}>
              <div className="simple simple1">
                <div className="simple-inner">
                  <ReactDragListView {...dragProps}>
                    <ol>
                      {this.state.testCases.map((item, index) => (
                        <li key={index}>
                          {item.title}
                          <a href="#">Drag</a>
                        </li>
                      ))}
                    </ol>
                  </ReactDragListView>
                </div>
              </div>
            </div>
          </Modal>
        </Stack>
      </>
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
