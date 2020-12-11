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
} from "react-router-dom";

import styles from "./Smartqs.module.scss";
import TestRun from "./TestRun/TestRun";
import TestRunModelMin from "./model/TestRunModelMin";
import TestRunOverview from "./TestRunOverview/TestRunOverview";

export default class Smartqs extends React.Component<
  ISmartqsProps,
  ISmartqsState
> {
  constructor(props) {
    super(props);
  }

  dummyDataMin: TestRunModelMin[] = [
    {
      _id: "0001",
      title: "Organisationsansicht",
      createdOn: "2020/10/02",
    },
    {
      _id: "0002",
      title: "Speiseplan",
      createdOn: "2020/10/04",
    },
  ];

  public render(): React.ReactElement<ISmartqsProps> {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            home
          </Route>
          <Route path="/dashboard">dashboard</Route>
          <Route path="/TestRuns">
            <TestRunOverview testRunsInfo={this.dummyDataMin} />
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}
