import * as React from "react";
import * as _ from "lodash";
import { Nav, INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { Route, NavLink, withRouter } from "react-router-dom";

import TestRun from "../TestRun/TestRun";
import TestRunModel from "../../model/TestRunModel";
import TestRunModelMin from "../../model/TestRunModelMin";
import styles from "./TestRunOverview.module.scss";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { FontSizes } from "office-ui-fabric-react";

interface ITestRunOverviewProps {
  teamsContext: any;
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

    // sort test Runs by createdOn Date
    testRunsInfo.sort((x, y) => {
      return new Date(y.createdOn).getTime() - new Date(x.createdOn).getTime();
    });

    if (testRunsInfo.length != 0) {
      testRunsInfo.map((value) => {
        var element: INavLink = {
          key: value._id,
          name: value.name,
          url: "#/runTest/" + value._id,
        };
        if (value.finished) element.icon = "success";
        else if (value.finished == false) element.icon = "failure";
        navLinks.push(element);
      });

      let navLinkGroups: INavLinkGroup[] = [
        { name: "Test Runs", links: navLinks },
      ];

      this.setState({ navLinkGroups: navLinkGroups });
    }
  }

  public render(): React.ReactElement<ITestRunOverviewProps> {
    const { navLinkGroups } = this.state;
    const id = this.props["history"]["location"]["pathname"].split("/")[2]
      ? this.props["history"]["location"]["pathname"].split("/")[2]
      : null;

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
          <Route path="/runTest/:id">
            <TestRun reloadTestRunNav={this.reloadTestRunNav} />
          </Route>
        </div>
      </div>
    );
  }
}

export default withRouter(TestRunOverview);
