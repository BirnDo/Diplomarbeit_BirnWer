import * as React from "react";
import { ISmartQSNavProps } from "./ISmartQSNavProps";
import { ISmartQSNavState } from "./ISmartQSNavState";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
  HashRouter,
  withRouter,
} from "react-router-dom";

import TestRunForms from "../TestRunForms/TestRunForms";
import styles from "../Smartqs.module.scss";
import Dashboard from "../Dashboard/Dashboard";
import TestRunModelMin from "../../model/TestRunModelMin";
import TestRunOverview from "../TestRunOverview/TestRunOverview";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Label } from "office-ui-fabric-react/lib/Label";
import { UrlQueryParameterCollection } from "@microsoft/sp-core-library";
import Home from "../Home/Home";

class SmartQSNav extends React.Component<ISmartQSNavProps, ISmartQSNavState> {
  constructor(props) {
    super(props);

    /* this.deleteTestruns([
      "60214626ed9dc82eb87f0a57",
      "60214620ed9dc82eb87f0a53",
    ]); */
    this.props["history"].push("/home");
  }

  deleteTestruns(blacklist: string[]) {
    var url = "http://127.0.0.1:3000/minimalTestDefinitions";
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    var body: TestRunModelMin[];

    fetch(url, requestOptions)
      .then(async (response) => {
        body = await response.json();
        body.map((value) => {
          var allowed = true;

          blacklist.forEach((v) => {
            if (v == value._id) allowed = false;
          });
          if (allowed) {
            const url =
              "http://localhost:3000/deleteTestDefiniton/" + value._id;
            const requestOptions = {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            };

            fetch(url, requestOptions)
              .then(async (response) => {})
              .catch((rejected) => console.log(rejected));
          }
        });
      })
      .catch((rejected) => console.log(rejected));
  }

  public render(): React.ReactElement<ISmartQSNavProps> {
    let path: string =
      "/" + this.props["history"]["location"]["pathname"].split("/")[1]; // path that excludes any id to set the selected pivot element

    return (
      <>
        <Pivot
          onLinkClick={(e) => {
            this.props["history"].push(e.props.itemKey);
          }} // link to navigate between pages
          selectedKey={path} // currently selected element
        >
          <PivotItem headerText="Home" itemKey="/home"></PivotItem>
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
            <Route path="/home">
              <Home
                teamsContext={this.props.teamsContext}
                serverURL={this.props.serverURL}
                readonly={true}
              />
            </Route>
            <Route path="/dashboard">
              <Dashboard
                teamsContext={this.props.teamsContext}
                webpartContext= {this.props.webpartContext}
                serverURL={this.props.serverURL}
                enableDrillDown={this.props.enableDrillDown}
                enableStatisticsChart={this.props.enableStatisticsChart}
              />
            </Route>
            <Route path="/runTest">
              <TestRunOverview
                teamsContext={this.props.teamsContext}
                readonly={false}
                serverURL={this.props.serverURL}
              />
            </Route>
            <Route path="/createTest">
              <TestRunForms
                teamsContext={this.props.teamsContext}
                serverURL={this.props.serverURL}
              />
            </Route>
          </Switch>
        </div>
      </>
    );
  }
}

export default withRouter(SmartQSNav);
