import * as React from "react";
import * as _ from "lodash";
import { Route, NavLink, withRouter } from "react-router-dom";
import {
  ChartControl,
  ChartType,
} from "@pnp/spfx-controls-react/lib/ChartControl";
import Chart from "chart.js";
import TestRunModelMin from "../../model/TestRunModelMin";
import {
  DefaultButton,
  FontWeights,
  getTheme,
  mergeStyleSets,
  rgb2hsv,
  TextField,
} from "office-ui-fabric-react";
import TestRunModel from "../../model/TestRunModel";
import DetailedDashboard from "../DetailedDashboard/DetailedDrillDownChart";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import styles from "./DrillDownChart.module.scss";
import { Bar } from "react-chartjs-2";
import {
  AadHttpClient,
  AadHttpClientFactory,
  IHttpClientOptions,
} from "@microsoft/sp-http";
import { SmartqsHttpClient } from "../../services/SmartqsHttpClient";

interface IDrillDownChartProps {
  teamsContext: any;
  serverURL: string;
  startDate: string;
  endDate: string;
  aadClient: AadHttpClientFactory;
}
interface IDrillDownChartState {}

class DrillDownChart extends React.Component<
  IDrillDownChartProps,
  IDrillDownChartState
> {
  chart: Chart;
  canvasRef: any;

  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  /* #region  react lifecycle methods */
  componentDidMount() {
    this.getTestRunMinData();
  }

  componentDidUpdate() {
    this.getTestRunMinData();
  }
  /* #endregion */

  /* #region  database request methods */
  /**
   * receives all test run min data
   * filters only test runs that are completed
   * sorts the test runs by completion
   * calls setTestRunsChart() to set the chart data
   *
   * @memberof DrillDownChart
   */
  async getTestRunMinData() {
    const { teamsContext, startDate, endDate } = this.props;
    let channelID: string = teamsContext ? teamsContext.channelId : "";
    let url: string;
    let requestOptions: any;
    let httpClient: AadHttpClient = SmartqsHttpClient.getClient(
      this.props.aadClient,
      this.props.serverURL
    );
    if (startDate == null) {
      url = `${this.props.serverURL}/minimalTestDefinitions/${channelID}`;
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
    } else {
      url = `${this.props.serverURL}/getMinimalDefinitionsByTimePeriod/${channelID}`;
      requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      };
    }

    httpClient
      .fetch(url, AadHttpClient.configurations.v1, requestOptions)
      .then(async (response) => {
        const body: TestRunModelMin[] = await response.json();
        let filteredBody = body.filter((value) => {
          return value.finished == true || value.finished == false;
        });
        let sortedBody = filteredBody.sort((x, y) => {
          return x === y ? 0 : x ? -1 : 1;
        });
        this.setTestRunsChart(sortedBody);
        console.log(sortedBody);
      })
      .catch((rejected) => console.log(rejected));
  }
  /* #endregion */

  /* #region  state helper methods */
  /**
   * sets the chart data from given database request
   *
   * @param {TestRunModelMin[]} body
   * @memberof DrillDownChart
   */
  setTestRunsChart(body: TestRunModelMin[]) {
    let data: any = { datasets: [] };

    const options: any = {
      onClick: async (e, i) => {
        let id = this.chart.getElementAtEvent(e)[0]
          ? data.datasets[this.chart.getElementAtEvent(e)[0]._datasetIndex]._id
          : null;
        if (id != null) {
          this.props["history"].push("/dashboard/" + id);
        }
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            ticks: {
              callback: () => "",
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              callback: () => "",
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
      tooltips: {
        mode: "nearest",
        callbacks: {
          title: () => "",
          label: (tooltipItem, data) => {
            let item = data.datasets[tooltipItem.datasetIndex];
            let status = item.finished ? "Erfolgreich" : "Fehlerhaft";
            return item.label + ": " + status;
          },
        },
      },
      title: {
        display: true,
        text: "Test Runs",
      },
    };

    body.map((value, index) => {
      data.datasets.push({
        label: value.name,
        data: [1],
        backgroundColor:
          value.finished == true
            ? "rgba(74, 192, 192, 0.2)"
            : value.finished == false
            ? "rgba(254, 99, 132, 0.2)"
            : "rgba(200, 203, 207, 0.2)",
        borderColor: "rgb(74, 192, 192)",
        borderWidth: 1,
        _id: value._id,
        finished: value.finished,
      });
    });

    this.chart = new Chart(this.canvasRef.current, {
      type: "horizontalBar",
      data: data,
      options: options,
    });
    console.log("chart data set");
  }
  /* #endregion */

  public render(): React.ReactElement<IDrillDownChartProps> {
    return (
      <>
        <Route exact path="/dashboard">
          <canvas ref={this.canvasRef} />
          {/* <Bar
            data={{
              labels: ["test1", "test2", "test3"],
              datasets: [{ data: [3, 2, 4] }],
            }}
            width={1000}
          /> */}
          {/* <ChartControl
            type={ChartType.Bar}
            data={{
              labels: ["test1", "test2", "test3"],
              datasets: [{ data: [3, 2, 4] }],
            }}
          /> */}
        </Route>
        <Route path="/dashboard/:id">
          <DetailedDashboard serverURL={this.props.serverURL} />
        </Route>
      </>
    );
  }
}
export default withRouter(DrillDownChart);

/* #region  styling for fluent ui components */
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
/* #endregion */
