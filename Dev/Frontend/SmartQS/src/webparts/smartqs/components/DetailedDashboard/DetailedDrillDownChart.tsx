import * as React from "react";
import * as _ from "lodash";
import { Route, NavLink, withRouter } from "react-router-dom";
import {
  ChartControl,
  ChartType,
} from "@pnp/spfx-controls-react/lib/ChartControl";
import Chart from "chart.js";
import TestRunModelMin from "../../model/TestRunModelMin";
import TestRunModel from "../../model/TestRunModel";
import styles from "./DetailedDrillDownChart.module.scss";
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
  RatingBase,
} from "office-ui-fabric-react";
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
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import {
  AadHttpClient,
  AadHttpClientFactory,
  IHttpClientOptions,
} from "@microsoft/sp-http";
import { SmartqsHttpClient } from "../../services/SmartqsHttpClient";
interface IDetailedDrillDownChartProps {
  serverURL: string;
  aadClient: AadHttpClientFactory;
}
interface IDetailedDrillDownChartState {
  showModal: boolean;
  title: string;
  description: string;
  image: string;
  comments: string;
}

class DetailedDrillDownChart extends React.Component<
  IDetailedDrillDownChartProps,
  IDetailedDrillDownChartState
> {
  chart: Chart;
  canvasRef: any;

  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();

    this.state = {
      showModal: false,
      title: null,
      description: null,
      image: null,
      comments: null,
    };
  }

  /* #region  react lifecycle methods */
  componentDidMount() {
    this.getSingleTestRunData();
  }
  /* #endregion */

  /* #region  database request methods */
  /**
   * receives a specific test run an calls setDetailedTestRunChart()
   *
   * @memberof DetailedDrillDownChart
   */
  async getSingleTestRunData() {
    const id = this.props["match"]["params"]["id"];
    if (id != null) {
      const url = this.props.serverURL + "/testDefinitionById/" + id;
      const requestOptions = {
        method: "GET",
        headers: { Accept: "application/json" },
      };
      let httpClient: AadHttpClient = SmartqsHttpClient.getClient(
        this.props.aadClient,
        this.props.serverURL
      );

      httpClient
        .fetch(url, AadHttpClient.configurations.v1, requestOptions)
        .then(async (response) => {
          const body: TestRunModel = await response.json();
          this.setDetailedTestRunChart(body);
        })
        .catch((rejected) => console.log(rejected));
    }
  }
  /* #endregion */

  /* #region  state helper methods */
  /**
   * sets the chart data that is given by the database request
   *
   * @param {TestRunModel} body
   * @memberof DetailedDrillDownChart
   */
  setDetailedTestRunChart(body: TestRunModel) {
    let data: any = { datasets: [] };

    const options: any = {
      onClick: (e, i) => {
        let item = this.chart.getElementAtEvent(e)[0]
          ? data.datasets[this.chart.getElementAtEvent(e)[0]._datasetIndex]
          : null;
        if (item != null) {
          this.setState({
            title: item.label,
            description: item.description,
            image: item.image,
            comments: item.comments,
          });
          this.showModal();
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
        text: body.name,
      },
    };

    body.testCases.map((value, index) => {
      data.datasets.push({
        label: value.title,
        data: [10],
        backgroundColor:
          value.status == "successful"
            ? "rgba(74, 192, 192, 0.2)"
            : value.status == "faulty"
            ? "rgba(254, 99, 132, 0.2)"
            : value.status == "optional"
            ? "rgba(153, 102, 255, 0.2)"
            : "rgba(200, 203, 207, 0.2)",
        borderColor: [
          "rgb(74, 192, 192)",
          "rgb(254, 99, 132)",
          "rgb(153, 102, 255)",
          "rgb(200, 203, 207)",
        ],
        borderWidth: 1,
        description: value.description,
        comments: value.comments,
        img: value.image,
      });
    });

    this.chart = new Chart(this.canvasRef.current, {
      type: "horizontalBar",
      data: data,
      options: options,
    });
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  /* #endregion */

  /* #region  render helper methods */
  /**
   * returns the error message if available at current test case
   *
   * @param {string} comments
   * @return {*}  {React.ReactNode}
   * @memberof DetailedDrillDownChart
   */
  renderErrorMessage(comments: string): React.ReactNode {
    if (comments != null)
      return (
        <>
          <span>Fehlermeldung</span>
          <RichText isEditMode={false} value={comments} />
        </>
      );
  }
  /* #endregion */

  public render(): React.ReactElement<IDetailedDrillDownChartProps> {
    const { title, description, image, comments } = this.state;
    const cancelIcon: IIconProps = { iconName: "Cancel" };

    return (
      <div>
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
        <Modal
          isOpen={this.state.showModal}
          onDismiss={this.hideModal}
          isBlocking={false}
          containerClassName={contentStyles.container}
        >
          <div className={contentStyles.header}>
            <span>{title}</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this.hideModal}
            />
          </div>
          <div className={contentStyles.body}>
            <RichText isEditMode={false} value={description} />
            {this.renderErrorMessage(comments)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(DetailedDrillDownChart);

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
