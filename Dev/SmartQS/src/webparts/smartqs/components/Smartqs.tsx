import * as React from "react";
import { ISmartqsProps } from "./ISmartqsProps";
import { ISmartqsState } from "./ISmartqsState";
import { escape } from "@microsoft/sp-lodash-subset";

import styles from "./Smartqs.module.scss";
import TestRun from "./TestRun/TestRun";
import TestRunModel from "./model/TestRunModel";

export default class Smartqs extends React.Component<
  ISmartqsProps,
  ISmartqsState
> {
  constructor(props) {
    super(props);

    this.state = {
      testRunIndex: null,
    };
  }

  dummyData: TestRunModel[] = [
    {
      title: "Organisationsansicht",
      createdOn: "2020/10/02",
      testCases: [
        {
          title: "Öffnen Sie das Sharepoint",
          description:
            "Öffnen Sie das Sharepoint ihrer Firma. Loggen Sie sich anschließend mit ihren Micosoft Konto an und navigieren Sie zur Startseite.",
          status: null,
          active: true,
          message: "",
        },
        {
          title: "Öffnen Sie die Organisationsansicht",
          description:
            "Navigieren Sie zu den Favoriten auf dem Sharepoint. Drücken Sie dann auf die Organisationsansicht. Nun soll eine Liste aller Mitarbeiter mit den jeweiligen Kontaktinformation erscheinen.",
          status: null,
          active: false,
          message: "",
        },
        {
          title: "Testen Sie die Kontaktinformationen",
          description:
            "Drücken Sie auf alle Kontaktinformationen des ersten Mitarbeiters und testen Sie ob Sie zur richtigen Webseite weitergeleitet werden.",
          status: null,
          active: false,
          message: "",
        },
      ],
    },
    {
      title: "Speiseplan",
      createdOn: "2020/10/04",
      testCases: [
        {
          title: "Öffnen Sie das Sharepoint",
          description:
            "Öffnen Sie das Sharepoint ihrer Firma. Loggen Sie sich anschließend mit ihren Micosoft Konto an und navigieren Sie zur Startseite.",
          status: null,
          active: true,
          message: "",
        },
        {
          title: "Öffnen Sie den Speiseplan",
          description:
            "Navigieren Sie zu den Favoriten auf dem Sharepoint. Drücken Sie dann auf den Speiseplan. Nun soll der heutige Speiseplan angezeigt werden.",
          status: null,
          active: false,
          message: "",
        },
        {
          title: "Testen Sie die anderen Orte",
          description:
            "Drücken Sie auf die anderen Orte und testen Sie ob der Speiseplan richtig angezeigt wird.",
          status: null,
          active: false,
          message: "",
        },
      ],
    },
  ];

  public render(): React.ReactElement<ISmartqsProps> {
    if (!this.state.testRunIndex)
      return (
        <div className={styles.container}>
          {this.dummyData.map((value, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  console.log(value);
                  this.setState({ testRunIndex: index });
                }}
              >
                {value.title}
              </button>
            );
          })}
        </div>
      );
    else return <TestRun testRun={this.dummyData[this.state.testRunIndex]} />;
  }
}
