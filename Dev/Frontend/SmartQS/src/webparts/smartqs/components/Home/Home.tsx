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
import styles from "./Home.module.scss";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import DrillDownChart from "../DrillDownChart/DrillDownChart";
import TestRunStatisticModel from "../../model/TestRunStatisticsModel";
import TestCaseStatisticModel from "../../model/TestCaseStatisticsModel";
import TestRunOverview from "../TestRunOverview/TestRunOverview";
import {
  AadHttpClient,
  AadHttpClientFactory,
  IHttpClientOptions,
} from "@microsoft/sp-http";
interface IHomeProps {
  teamsContext: any;
  serverURL: string;
  aadClient: AadHttpClientFactory;
}
interface IHomeState {
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
class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  public render(): React.ReactElement<IHomeProps> {
    const { startDate, endDate } = this.state;

    const resetIcon: IIconProps = { iconName: "Cancel" };

    return (
      <div>
        <Route path="/">
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
            <TestRunOverview
              teamsContext={this.props.teamsContext}
              readonly={true}
              startDate={startDate}
              endDate={endDate}
              serverURL={this.props.serverURL}
              navTitle={"Durchgeführte Tests"}
              aadClient={this.props.aadClient}
            />
          </Stack>
        </Route>
      </div>
    );
  }
}
export default withRouter(Home);

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
