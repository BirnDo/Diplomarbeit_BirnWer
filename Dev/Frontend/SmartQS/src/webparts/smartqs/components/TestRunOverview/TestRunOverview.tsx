import * as React from "react";
import * as _ from "lodash";
import { Nav, INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { Route, NavLink, withRouter } from "react-router-dom";

import TestRun from "../TestRun/TestRun";
import TestRunModel from "../../model/TestRunModel";
import TestRunModelMin from "../../model/TestRunModelMin";
import styles from "./TestRunOverview.module.scss";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { FontSizes, ThemeSettingName } from "office-ui-fabric-react";
import { objectToSPKeyValueCollection } from "@pnp/sp";
import {
  AadHttpClient,
  AadHttpClientFactory,
  IHttpClientOptions,
} from "@microsoft/sp-http";
import { SmartqsHttpClient } from "../../services/SmartqsHttpClient";

interface ITestRunOverviewProps {
  teamsContext: any;
  readonly: boolean;
  startDate: string;
  endDate: string;
  serverURL: string;
  navTitle: string;
  aadClient: AadHttpClientFactory;
}
interface ITestRunOverviewState {
  navLinkGroups: INavLinkGroup[];
}

class TestRunOverview extends React.Component<
  ITestRunOverviewProps,
  ITestRunOverviewState
> {
  constructor(props) {
    super(props);

    this.state = {
      navLinkGroups: null,
    };
  }

  /* #region  react lifecycle methods */
  componentDidMount() {
    this.getTestRunMinData();
  }

  componentWillReceiveProps(prevProps: object) {
    this.getTestRunMinData();
  }
  /* #endregion */

  /* #region  database request methods */
  /**
   * receives the minimal test runs from the database
   * if date range is given only receives those
   * calls setNavLinks method
   *
   * @memberof TestRunOverview
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
      url = this.props.serverURL + "/minimalTestDefinitions/" + channelID;
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
    } else {
      url = `${this.props.serverURL} 
        /getMinimalDefinitionsByTimePeriod/${channelID}`;
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
        this.setNavLinks(body);
        console.log(body);
      })
      .catch((rejected) => console.log(rejected));
  }
  /* #endregion */

  /* #region  state helper methods */
  /**
   * sets the nav bar links according to the given data
   * sorts the test runs by creation date
   * adds a successful or faulty icon if test run has already been done
   *
   * @param {TestRunModelMin[]} testRunsInfo
   * @memberof TestRunOverview
   */
  setNavLinks(testRunsInfo: TestRunModelMin[]) {
    let navLinks: INavLink[] = [];
    let filteredTestRunsInfo = testRunsInfo;

    const urlPath =
      "/" + this.props["history"]["location"]["pathname"].split("/")[1];
    if (this.props.readonly) {
      // only show completed when readonly mode is set
      filteredTestRunsInfo = filteredTestRunsInfo.filter(
        (value) => value.finished != null
      );
    }

    // sort test Runs by createdOn Date
    filteredTestRunsInfo.sort((x, y) => {
      return new Date(y.createdOn).getTime() - new Date(x.createdOn).getTime();
    });

    if (filteredTestRunsInfo.length != 0) {
      filteredTestRunsInfo.map((value) => {
        var element: INavLink = {
          key: value._id,
          name: value.name,
          url: "#" + urlPath + "/" + value._id,
        };
        if (
          this.props.readonly &&
          (value.finished == true || value.finished == false)
        )
          // if nav is readonly, the doneOn Date should be listed
          element.name =
            value.name + " " + new Date(value.doneOn).toLocaleDateString();
        if (value.finished) element.icon = "success";
        else if (value.finished == false) element.icon = "failure";
        navLinks.push(element);
      });

      let navLinkGroups: INavLinkGroup[] = [
        { name: this.props.navTitle, links: navLinks },
      ];
      console.log(navLinkGroups);

      this.setState({ navLinkGroups: navLinkGroups });
    }
  }
  /* #endregion */

  /* #region  state management functions */
  /**
   * is passed to child component to allow it to reload the navbar if the test run updated
   *
   * @memberof TestRunOverview
   */
  reloadTestRunNav = () => {
    this.getTestRunMinData();
  };
  /* #endregion */

  public render(): React.ReactElement<ITestRunOverviewProps> {
    const { navLinkGroups } = this.state;

    console.log(navLinkGroups);

    const id = this.props["history"]["location"]["pathname"].split("/")[2]
      ? this.props["history"]["location"]["pathname"].split("/")[2]
      : null; // receives the id from url to set the selected nav bar element
    let urlPath =
      "/" + this.props["history"]["location"]["pathname"].split("/")[1]; // receives the url path like /dashboard or /runTest for route configuration
    console.log(urlPath);
    if (urlPath == "/") urlPath += ":id";
    else urlPath += "/:id";

    console.log(urlPath);
    return (
      <div className={styles.TestRunOverview}>
        <div>
          <Nav
            className={styles.Nav}
            styles={{
              root: {
                width: "fit-content",
                height: "fit-content",
                boxSizing: "border-box",
                border: "1px solid #eee",
                overflowY: "auto",
                background: "white",
              },
            }}
            groups={navLinkGroups} // passing nav links that are updated when database receives data
            selectedKey={id} // selecting the url id if the page got reloaded
          />
        </div>
        <div className={styles.Testrun}>
          <Route
            exact
            path={urlPath} // dynamically setting route path as this component gets called from /dashboard or /runTest
          >
            <TestRun
              reloadTestRunNav={this.reloadTestRunNav} // helper function to allow the test run to update the navbar
              readonly={this.props.readonly} // readonly flag to pass the given value to the test run
              serverURL={this.props.serverURL} // backend url for database request usage
              aadClient={this.props.aadClient}
            />
          </Route>
        </div>
      </div>
    );
  }
}

export default withRouter(TestRunOverview);
