import * as React from "react";
import * as _ from "lodash";
import { Route, NavLink, withRouter } from "react-router-dom";
import {
  ChartControl,
  ChartType,
} from "@pnp/spfx-controls-react/lib/ChartControl";
import Chart from "chart.js";
import TestRunModelMin from "../../model/TestRunModelMin";
import { rgb2hsv } from "office-ui-fabric-react";
import TestRunModel from "../../model/TestRunModel";
import DetailedDashboard from "../DetailedDashboard/DetailedDashboard";
import styles from "./Dashboard.module.scss";

interface IDashboardProps {
  teamsContext: any;
}
interface IDashboardState {}

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
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
        "http://127.0.0.1:3000/minimalTestDefinitionsByChannelID/" +
        this.props.teamsContext.channelId;
    else url = "http://127.0.0.1:3000/minimalTestDefinitions";
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

  public render(): React.ReactElement<IDashboardProps> {
    return (
      <div className={styles.Dashboard}>
        <Route exact path="/dashboard">
          <canvas ref={this.canvasRef} />
        </Route>
        <Route path="/dashboard/:id">
          <DetailedDashboard />
        </Route>
      </div>
    );
  }
}

export default withRouter(Dashboard);
