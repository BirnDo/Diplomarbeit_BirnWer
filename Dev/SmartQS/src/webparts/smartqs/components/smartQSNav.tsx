import * as React from "react";
import { ISmartqsProps } from "./ISmartqsProps";
import { ISmartqsState } from "./ISmartqsState";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
  HashRouter,
  withRouter,
} from "react-router-dom";

import TestRunForms from "./TestRunForms/TestRunForms";
import styles from "./Smartqs.module.scss";
import TestRun from "./TestRun/TestRun";
import TestRunModelMin from "./model/TestRunModelMin";
import TestRunOverview from "./TestRunOverview/TestRunOverview";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Label } from "office-ui-fabric-react/lib/Label";
import { UrlQueryParameterCollection } from "@microsoft/sp-core-library";

class smartQSNav extends React.Component<ISmartqsProps, ISmartqsState> {
  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<ISmartqsProps> {
    return (
      <>
        <Pivot
          onLinkClick={(e) => {
            this.props["history"].push(e.props.itemKey);
          }}
          selectedKey={this.props["history"]["location"]["pathname"]}
          defaultSelectedIndex={this.props["history"]["location"]["pathname"]}
        >
          <PivotItem headerText="Home" itemKey="/"></PivotItem>
          <PivotItem headerText="Dashboard" itemKey="/dashboard"></PivotItem>
          <PivotItem
            headerText="Tests durchführen"
            itemKey="/runTest"
          ></PivotItem>
          <PivotItem
            headerText="Tests erstellen"
            itemKey="/createTest"
          ></PivotItem>
        </Pivot>
        <div className={styles.Switch}>
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route path="/dashboard">Dashboard</Route>
            <Route path="/runTest">
              <TestRunOverview />
            </Route>
            <Route path="/createTest">
              <TestRunForms />
            </Route>
          </Switch>
        </div>
      </>
    );
  }
}

export default withRouter(smartQSNav);
