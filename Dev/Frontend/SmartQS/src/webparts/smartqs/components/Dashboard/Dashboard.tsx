import * as React from "react";
import * as _ from "lodash";
import { Route, NavLink, withRouter } from "react-router-dom";
import {
  ChartControl,
  ChartType,
  IAccessibleChartTableState,
} from "@pnp/spfx-controls-react/lib/ChartControl";
import Chart from "chart.js";
import TestRunModelMin from "../../model/TestRunModelMin";
import {
  DatePicker,
  DayOfWeek,
  getFocusableByIndexPath,
  getTheme,
  IconButton,
  IDatePickerStrings,
  IIconProps,
  IStackProps,
  rgb2hsv,
  Stack,
} from "office-ui-fabric-react";
import TestRunModel from "../../model/TestRunModel";
import DetailedDashboard from "../DetailedDashboard/DetailedDrillDownChart";
import styles from "./Dashboard.module.scss";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import DrillDownChart from "../DrillDownChart/DrillDownChart";
import TestRunStatisticModel from "../../model/TestRunStatisticsModel";
import TestCaseStatisticModel from "../../model/TestCaseStatisticsModel";
import TestRunOverview from "../TestRunOverview/TestRunOverview";
import { Bar, Line } from "react-chartjs-2";

interface IDashboardProps {
  teamsContext: any;
  serverURL: string;
  enableDrillDown: boolean;
  enableStatisticsChart: boolean;
}
interface IDashboardState {
  runData: Chart.ChartData;
  caseData: Chart.ChartData;
  runOptions: any;
  caseOptions: any;
  startDate: string;
  endDate: string;
}
const columnPropsVertical: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
};

const columnPropsHorizontal: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
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
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  testCaseChartReference: any;
  testRunChartReference: any;
  testCaseChart: Chart;
  testRunChart: Chart;

  constructor(props) {
    super(props);

    this.testCaseChartReference = React.createRef();
    this.testRunChartReference = React.createRef();

    this.state = {
      startDate: null,
      endDate: null,
      runData: null,
      caseData: null,
      runOptions: {
        responsive: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        barThickness: "flex",
        title: {
          display: true,
          text: "Test Statistik",
        },
        legend: {
          display: false,
        },
        /* tooltips: {
          mode: "nearest",
          callbacks: {
            title: () => "",
            label: (tooltipItem, data) => {
              var label = data.datasets[tooltipItem.datasetIndex];
              console.log(label);
              return label;
            },
          },
        }, */ scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 11,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 9,
              },
            },
          ],
        },
      },
      caseOptions: {
        responsive: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        barThickness: "flex",
        title: {
          display: true,
          text: "Testfall Statistik",
        },
        legend: {
          display: false,
        },
        /* tooltips: {
          mode: "nearest",
          callbacks: {
            title: () => "",
            label: (tooltipItem, data) => {
              var label = data.datasets[tooltipItem.datasetIndex];
              console.log(label);
              return label;
            },
          },
        }, */
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 11,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 9,
              },
            },
          ],
        },
      },
    };
  }

  /* #region  react lifecycle methods */
  componentDidMount() {
    const { runData, caseData } = this.state;

    if (!runData) this.getTestRunStatistics();
    if (!caseData) this.getTestCaseStatistics();
  }

  componentDidUpdate(prevProps: object, prevState: object) {
    const { startDate, endDate } = this.state;

    if (
      prevState["startDate"] != startDate ||
      prevState["endDate"] != endDate
    ) {
      this.getTestCaseStatistics();
      this.getTestRunStatistics();
    }
  }
  /* #endregion */

  /* #region  database request methods */
  async getTestRunStatistics() {
    const { startDate, endDate } = this.state;
    const { teamsContext } = this.props;

    let channelID: string = teamsContext ? teamsContext.channelId : "";
    let url: string;
    let requestOptions: any;
    if (startDate == null) {
      url = this.props.serverURL + "/getSuccessStatistics/" + channelID;
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
    } else {
      url =
        this.props.serverURL + "/getSuccessStatisticsByTimePeriod/" + channelID;
      requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      };
    }

    fetch(url, requestOptions)
      .then(async (response) => {
        const body: TestRunStatisticModel = await response.json();
        const { runData } = this.state;
        let newData = runData;
        (newData = {
          labels: ["Erfolgreich", "Fehlerhaft", "Nicht durchgeführt"],
          datasets: [
            {
              label: "",
              data: [body.successful, body.failed, body.notDone],
              backgroundColor: [
                "rgba(74, 192, 192, 0.2)",
                "rgba(254, 99, 132, 0.2)",
                "rgba(200, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(74, 192, 192)",
                "rgb(254, 99, 132)",
                "rgb(200, 203, 207)",
              ],
              borderWidth: 0,
            },
          ],
        }),
          this.setState({ runData: newData });
      })

      .catch((rejected) => console.log(rejected));
  }

  async getTestCaseStatistics() {
    const { startDate, endDate } = this.state;
    const { teamsContext } = this.props;

    let channelID: string = teamsContext ? teamsContext.channelId : "";
    let url: string;
    let requestOptions: any;
    if (startDate == null) {
      url = this.props.serverURL + "/getTestCaseSuccessStatistics/" + channelID;
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
    } else {
      url =
        this.props.serverURL +
        "/getTestCaseSuccessStatisticsByTimePeriod/" +
        channelID;
      requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      };
    }

    fetch(url, requestOptions)
      .then(async (response) => {
        const body: TestCaseStatisticModel = await response.json();
        const { caseData } = this.state;
        let newData = caseData;
        (newData = {
          labels: [
            "Erfolgreich",
            "Fehlerhaft",
            "Optional",
            "Nicht durchgeführt",
          ],
          datasets: [
            {
              label: "",
              data: [body.successful, body.failed, body.optional, body.notDone],
              backgroundColor: [
                "rgba(74, 192, 192, 0.2)",
                "rgba(254, 99, 132, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(200, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(74, 192, 192)",
                "rgb(254, 99, 132)",
                "rgb(153, 102, 255)",
                "rgb(200, 203, 207)",
              ],
              borderWidth: 0,
            },
          ],
        }),
          this.setState({ caseData: newData });
      })

      .catch((rejected) => console.log(rejected));
  }
  /* #endregion */

  renderStatisticsCharts() {
    const { runData, caseData, runOptions, caseOptions } = this.state;
    const { enableStatisticsChart } = this.props;

    if (enableStatisticsChart) {
      if (runData || caseData) {
        return (
          <div className={styles.ChartContainer}>
            {runData ? (
              <div className={styles.leftChart}>
                <Bar
                  redraw={true}
                  ref={this.testRunChartReference}
                  height={300}
                  data={runData}
                  options={runOptions}
                />
              </div>
            ) : (
              <></>
            )}
            {caseData ? (
              <div className={styles.rightChart}>
                <Bar
                  redraw={true}
                  ref={this.testCaseChartReference}
                  height={300}
                  data={caseData}
                  options={caseOptions}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      }
    }
  }

  renderDrillDownChart(): React.ReactNode {
    const { enableDrillDown } = this.props;
    if (enableDrillDown)
      return (
        <DrillDownChart
          teamsContext={this.props.teamsContext}
          serverURL={this.props.serverURL}
        />
      );
  }

  public render(): React.ReactElement<IDashboardProps> {
    const { startDate, endDate } = this.state;
    console.log(this.props);

    const resetIcon: IIconProps = { iconName: "Cancel" };

    return (
      <div className={styles.Dashboard}>
        <Stack {...columnPropsVertical}>
          <Stack horizontal {...columnPropsHorizontal}>
            <Stack horizontal>
              <DatePicker
                firstDayOfWeek={DayOfWeek.Monday}
                strings={DayPickerStrings}
                placeholder="Start-Datum auswählen"
                ariaLabel="Select a date"
                value={startDate ? new Date(startDate) : null}
                label=""
                onSelectDate={(e) => {
                  this.setState({
                    startDate: new Date(
                      e.setTime(e.getTime() + 1 * 60 * 60 * 1000)
                    ).toISOString(),
                  });
                }}
                className={styles.DatePicker}
              />
              <IconButton
                styles={iconButtonStyles}
                iconProps={resetIcon}
                ariaLabel="Close popup modal"
                onClick={() => this.setState({ startDate: null })}
              />
            </Stack>
            <Stack horizontal>
              <DatePicker
                firstDayOfWeek={DayOfWeek.Monday}
                strings={DayPickerStrings}
                placeholder="End-Datum auswählen"
                ariaLabel="Select a date"
                value={endDate ? new Date(endDate) : null}
                label=""
                onSelectDate={(e) => {
                  this.setState({
                    endDate: new Date(
                      e.setTime(e.getTime() + 1 * 60 * 60 * 1000)
                    ).toISOString(),
                  });
                }}
                className={styles.DatePicker}
              />
              <IconButton
                styles={iconButtonStyles}
                iconProps={resetIcon}
                ariaLabel="Close popup modal"
                onClick={() => this.setState({ endDate: null })}
              />
            </Stack>
          </Stack>
          {this.renderStatisticsCharts()}
          {this.renderDrillDownChart()}
        </Stack>
      </div>
    );
  }
}
export default withRouter(Dashboard);

/* #region  styling for fluent ui components */
const theme = getTheme();
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
