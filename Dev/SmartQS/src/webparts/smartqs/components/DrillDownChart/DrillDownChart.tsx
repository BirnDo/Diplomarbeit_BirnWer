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
} from "office-ui-fabric-react";
import TestRunModel from "../../model/TestRunModel";
import DetailedDashboard from "../DetailedDashboard/DetailedDrillDownChart";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import styles from "./DrillDownChart.module.scss";

interface IDrillDownChartProps {
  teamsContext: any;
  serverURL: string;
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

  componentDidMount() {
    this.getTestRunMinData();
  }

  componentDidUpdate() {
    this.getTestRunMinData();
  }

  async getTestRunMinData() {
    let url: string;
    if (this.props.teamsContext != null)
      url =
        this.props.serverURL +
        "/minimalTestDefinitionsByChannelID/" +
        this.props.teamsContext.channelId;
    else url = this.props.serverURL + "/minimalTestDefinitions";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(url, requestOptions)
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

  setTestRunsChart(body: TestRunModelMin[]) {
    let data: any = { datasets: [] };

    const options: any = {
      onClick: async (e, i) => {
        let id = this.chart.getElementAtEvent(e)[0]
          ? data.datasets[this.chart.getElementAtEvent(e)[0]._datasetIndex]._id
          : null;
        if (id != null) {
          this.props["history"].push("/dashboard/drilldown/" + id);
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
        data: [10],
        backgroundColor: value.finished
          ? "rgba(0, 255, 0, 0.9)"
          : value.finished == false
          ? "rgba(255, 0, 0, 0.9)"
          : "grey",
        borderColor: "black",
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
  }

  public render(): React.ReactElement<IDrillDownChartProps> {
    return (
      <>
        <Route exact path="/dashboard/drilldown">
          <DefaultButton
            className={styles.Button}
            data-automation-id="test"
            allowDisabledFocus={true}
            disabled={false}
            checked={false}
            text="zurück"
            onClick={() => this.props["history"].push("/dashboard")}
          />
          <canvas ref={this.canvasRef} />
        </Route>
        <Route path="/dashboard/drilldown/:id">
          <DetailedDashboard serverURL={this.props.serverURL} />
        </Route>
      </>
    );
  }
}
export default withRouter(DrillDownChart);

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
