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

interface ITestRunOverviewProps {
  teamsContext: any;
  readonly: boolean;
  startDate: string;
  endDate: string;
  serverURL: string;
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

  componentDidMount() {
    this.getTestRunMinData();
  }

  componentWillReceiveProps(prevProps: object) {
    this.getTestRunMinData();
  }

  async getTestRunMinData() {
    const { teamsContext, startDate, endDate } = this.props;
    let channelID: string = teamsContext ? teamsContext.channelId : "";
    let url: string;
    let requestOptions: any;
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
      url =
        this.props.serverURL +
        "/getMinimalDefinitionsByTimePeriod/" +
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
    console.log(requestOptions);
    fetch(url, requestOptions)
      .then(async (response) => {
        const body: TestRunModelMin[] = await response.json();
        this.setNavLinks(body);
        console.log(body);
      })
      .catch((rejected) => console.log(rejected));
  }

  reloadTestRunNav = () => {
    this.getTestRunMinData();
  };

  setNavLinks(testRunsInfo: TestRunModelMin[]) {
    let navLinks: INavLink[] = [];

    const urlPath =
      "/" + this.props["history"]["location"]["pathname"].split("/")[1];
    // sort test Runs by createdOn Date
    testRunsInfo.sort((x, y) => {
      return new Date(y.createdOn).getTime() - new Date(x.createdOn).getTime();
    });

    if (testRunsInfo.length != 0) {
      testRunsInfo.map((value) => {
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
        { name: "Test Runs", links: navLinks },
      ];
      console.log(navLinkGroups);

      this.setState({ navLinkGroups: navLinkGroups });
    }
  }

  public render(): React.ReactElement<ITestRunOverviewProps> {
    const { navLinkGroups } = this.state;
    console.log("updated");
    console.log(navLinkGroups);
    const id = this.props["history"]["location"]["pathname"].split("/")[2]
      ? this.props["history"]["location"]["pathname"].split("/")[2]
      : null;
    const urlPath =
      "/" + this.props["history"]["location"]["pathname"].split("/")[1];

    return (
      <div className={styles.TestRunOverview}>
        <div className={styles.Nav}>
          <Nav
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
            groups={navLinkGroups}
            selectedKey={id}
          />
        </div>
        <div className={styles.Testrun}>
          <Route path={urlPath + "/:id"}>
            <TestRun
              reloadTestRunNav={this.reloadTestRunNav}
              readonly={this.props.readonly}
              serverURL={this.props.serverURL}
            />
          </Route>
        </div>
      </div>
    );
  }
}

export default withRouter(TestRunOverview);
