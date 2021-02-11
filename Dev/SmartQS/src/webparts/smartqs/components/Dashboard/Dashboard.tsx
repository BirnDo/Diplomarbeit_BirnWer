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
import { rgb2hsv } from "office-ui-fabric-react";
import TestRunModel from "../../model/TestRunModel";
import DetailedDashboard from "../DetailedDashboard/DetailedDrillDownChart";
import styles from "./Dashboard.module.scss";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import DrillDownChart from "../DrillDownChart/DrillDownChart";
import TestStatisticModel from "../../model/TestStatisticsModel";
import TestRunOverview from "../TestRunOverview/TestRunOverview";

interface IDashboardProps {
  teamsContext: any;
}
interface IDashboardState {
  data: Chart.ChartData;
  options: any;
}

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  constructor(props) {
    super(props);

    this.state = {
      data: {
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
      options: {
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
    };
  }

  componentDidMount() {
    if (
      this.state.data.datasets[0].data[0] == 0 &&
      this.state.data.datasets[0].data[1] == 0 &&
      this.state.data.datasets[0].data[2] == 0
    )
      this.getTestRunMinData();
  }

  async getTestRunMinData() {
    let url: string;
    if (this.props.teamsContext != null)
      url =
        "http://127.0.0.1:3000/getSuccessStatisticsByChannel/" +
        this.props.teamsContext.channelId;
    else url = "http://127.0.0.1:3000/getSuccessStatistics";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(url, requestOptions)
      .then(async (response) => {
        const body: TestStatisticModel = await response.json();
        let newData = this.state.data;
        newData.datasets[0].data[0] = body.successful;
        newData.datasets[0].data[1] = body.failed;
        newData.datasets[0].data[2] = body.notDone;
        this.setState({ data: newData });
      })

      .catch((rejected) => console.log(rejected));
  }

  public render(): React.ReactElement<IDashboardProps> {
    const { data, options } = this.state;

    return (
      <div className={styles.Dashboard}>
        <Route path="/dashboard">
          <ChartControl type={ChartType.Bar} data={data} options={options} />
          <TestRunOverview
            teamsContext={this.props.teamsContext}
            readonly={true}
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
