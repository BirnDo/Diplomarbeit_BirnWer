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

interface IDashboardProps {
  teamsContext: any;
}
interface IDashboardState {
  runData: Chart.ChartData;
  runOptions: any;
  caseData: Chart.ChartData;
  caseOptions: any;
  startDate: string;
  endDate: string;
}
const columnPropsVertical: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 500 } },
};

const columnPropsHorizontal: Partial<IStackProps> = {
  tokens: { childrenGap: 5 },
  styles: { root: { width: 400 } },
};
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      runData: {
        labels: ["Erfolgreich", "Fehlerhaft", "Nicht durchgeführt"],
        datasets: [
          {
            label: "",
            data: [0, 0, 0],
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
      },
      runOptions: {
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
        }, */
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      caseData: {
        labels: ["Erfolgreich", "Fehlerhaft", "Optional", "Nicht durchgeführt"],
        datasets: [
          {
            label: "",
            data: [0, 0, 0, 0],
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
      },
      caseOptions: {
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
              },
            },
          ],
        },
      },
    };
  }

  componentDidMount() {
    if (
      this.state.runData.datasets[0].data[0] == 0 &&
      this.state.runData.datasets[0].data[1] == 0 &&
      this.state.runData.datasets[0].data[2] == 0
    )
      this.getTestRunStatistics();
    if (
      this.state.caseData.datasets[0].data[0] == 0 &&
      this.state.caseData.datasets[0].data[1] == 0 &&
      this.state.caseData.datasets[0].data[2] == 0
    )
      this.getTestCaseStatistics();
  }

  componentDidUpdate(prevProps: object, prevState: object) {
    if (
      prevState["startDate"] != this.state.startDate ||
      prevState["endDate"] != this.state.endDate
    ) {
      this.getTestCaseStatistics();
      this.getTestRunStatistics();
    }
  }

  async getTestRunStatistics() {
    const { startDate, endDate } = this.state;
    const { teamsContext } = this.props;

    let channelID: string = teamsContext ? teamsContext.channelId : "";
    let url: string;
    let requestOptions: any;
    if (startDate == null) {
      url = "http://127.0.0.1:3000/getSuccessStatistics/" + channelID;
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
    } else {
      url =
        "http://127.0.0.1:3000/getSuccessStatisticsByTimePeriod/" + channelID;
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
        let newData = this.state.runData;
        newData.datasets[0].data[0] = body.successful;
        newData.datasets[0].data[1] = body.failed;
        newData.datasets[0].data[2] = body.notDone;
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
      url = "http://127.0.0.1:3000/getTestCaseSuccessStatistics/" + channelID;
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
    } else {
      url =
        "http://127.0.0.1:3000/getTestCaseSuccessStatisticsByTimePeriod/" +
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
        let newData = this.state.caseData;
        newData.datasets[0].data[0] = body.successful;
        newData.datasets[0].data[1] = body.failed;
        newData.datasets[0].data[2] = body.optional;
        newData.datasets[0].data[3] = body.notDone;
        this.setState({ caseData: newData });
      })

      .catch((rejected) => console.log(rejected));
  }

  public render(): React.ReactElement<IDashboardProps> {
    const {
      runData,
      runOptions,
      caseData,
      caseOptions,
      startDate,
      endDate,
    } = this.state;

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
    const resetIcon: IIconProps = { iconName: "Cancel" };

    return (
      <div className={styles.Dashboard}>
        <Route path="/dashboard">
          <Stack {...columnPropsVertical}>
            <Stack horizontal {...columnPropsHorizontal}>
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
            <Stack horizontal {...columnPropsHorizontal}>
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
          <ChartControl
            type={ChartType.Bar}
            data={runData}
            options={runOptions}
          />
          <ChartControl
            type={ChartType.Bar}
            data={caseData}
            options={caseOptions}
          />
          <TestRunOverview
            teamsContext={this.props.teamsContext}
            readonly={true}
            startDate={startDate}
            endDate={endDate}
          />
        </Route>
        <Route exact path="/dashboard/drilldown">
          <DrillDownChart teamsContext={this.props.teamsContext} />
        </Route>
        <Route path="/dashboard/drilldown/:id">
          <DetailedDashboard />
        </Route>
      </div>
    );
  }
}
export default withRouter(Dashboard);

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
