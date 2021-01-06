import * as React from "react";
import * as _ from "lodash";
import { Nav, INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { Route, NavLink } from "react-router-dom";

import TestRun from "../TestRun/TestRun";
import TestRunModel from "../model/TestRunModel";
import TestRunModelMin from "../model/TestRunModelMin";
import styles from "./TestRunOverview.module.scss";

interface ITestRunOverviewProps {
  testRunsInfo: TestRunModelMin[];
}
interface ITestRunOverviewState {
  navLinkGroups: INavLinkGroup[];
}

export default class TestRunOverview extends React.Component<
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
    const { testRunsInfo } = this.props;

    let navLinks: INavLink[] = [];

    testRunsInfo.map((value) => {
      var element: INavLink = {
        key: value._id,
        name: value.title,
        url: "#/runTest/" + value._id,
      };
      navLinks.push(element);
    });

    let navLinkGroups: INavLinkGroup[] = [
      { name: "Test Runs", links: navLinks },
    ];

    this.setState({ navLinkGroups: navLinkGroups });
  }

  public render(): React.ReactElement<ITestRunOverviewProps> {
    const { navLinkGroups } = this.state;

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
              },
            }}
            groups={navLinkGroups}
          />
        </div>
        <div className={styles.Testrun}>
          <Route path="/runTest/:id">
            <TestRun />
          </Route>
        </div>
      </div>
    );
  }
}
