import * as React from "react";
import styles from "./Sandbox.module.scss";
import { ISandboxProps } from "./ISandboxProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Element from "./element";

export default class Sandbox extends React.Component<ISandboxProps, {}> {
  public render(): React.ReactElement<ISandboxProps> {
    const dummyData = [
      {
        title: "Organisationsansicht",
        createdOn: "2020/10/02",
        elements: [
          {
            title: "Öffnen Sie das Sharepoint",
            description:
              "Öffnen Sie das Sharepoint ihrer Firma. Loggen Sie sich anschließend mit ihren Micosoft Konto an und navigieren Sie zur Startseite.",
            status: null,
          },
          {
            title: "Öffnen Sie die Organisationsansicht",
            description:
              "Navigieren Sie zu den Favoriten auf dem Sharepoint. Drücken Sie dann auf die Organisationsansicht. Nun soll eine Liste aller Mitarbeiter mit den jeweiligen Kontaktinformation erscheinen.",
            status: null,
          },
          {
            title: "Testen Sie die Kontaktinformationen",
            description:
              "Drücken Sie auf alle Kontaktinformationen des ersten Mitarbeiters und testen Sie ob Sie zur richtigen Webseite weitergeleitet werden.",
            status: null,
          },
        ],
      },
      {
        title: "Speiseplan",
        createdOn: "2020/10/04",
        elements: [
          {
            title: "Öffnen Sie das Sharepoint",
            description:
              "Öffnen Sie das Sharepoint ihrer Firma. Loggen Sie sich anschließend mit ihren Micosoft Konto an und navigieren Sie zur Startseite.",
            status: null,
          },
          {
            title: "Öffnen Sie den Speiseplan",
            description:
              "Navigieren Sie zu den Favoriten auf dem Sharepoint. Drücken Sie dann auf den Speiseplan. Nun soll der heutige Speiseplan angezeigt werden.",
            status: null,
          },
          {
            title: "Testen Sie die anderen Orte",
            description:
              "Drücken Sie auf die anderen Orte und testen Sie ob der Speiseplan richtig angezeigt wird.",
            status: null,
          },
        ],
      },
    ];

    [
      {
        title: "Öffnen Sie das Sharepoint",
        description:
          "Öffnen Sie das Sharepoint ihrer Firma. Loggen Sie sich anschließend mit ihren Micosoft Konto an und navigieren Sie zur Startseite.",
        status: null,
      },
      {
        title: "Öffnen Sie die Organisationsansicht",
        description:
          "Navigieren Sie zu den Favoriten auf dem Sharepoint. Drücken Sie dann auf die Organisationsansicht. Nun soll eine Liste aller Mitarbeiter mit den jeweiligen Kontaktinformation erscheinen.",
        status: null,
      },
      {
        title: "Testen Sie die Kontaktinformationen",
        description:
          "Drücken Sie auf alle Kontaktinformationen des ersten Mitarbeiters und testen Sie ob Sie zur richtigen Webseite weitergeleitet werden.",
        status: null,
      },
    ];

    return (
      <>
        {dummyData[0].elements.map((value, index) => {
          return (
            <Element
              counter={index + 1}
              text={value.title}
              status={value.status}
            />
          );
        })}
      </>
    );
  }
}
