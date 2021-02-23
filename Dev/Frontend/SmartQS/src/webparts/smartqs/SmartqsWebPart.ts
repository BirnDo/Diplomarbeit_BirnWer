import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "SmartqsWebPartStrings";
import Smartqs from "./components/Smartqs";
import { ISmartqsProps } from "./components/ISmartqsProps";

export interface ISmartqsWebPartProps {
  serverURL: string;
  enableDrillDown: boolean;
  enableStatisticsChart: boolean;
  prop: any;
}

export default class SmartqsWebPart extends BaseClientSideWebPart<
  ISmartqsWebPartProps
> {
  public render(): void {
    this.properties.enableDrillDown = true;
    this.properties.enableStatisticsChart = true;
    const element: React.ReactElement<ISmartqsProps> = React.createElement(
      Smartqs,
      {
        serverURL: this.properties.serverURL,
        context: this.context,
        enableDrillDown: this.properties.enableDrillDown ? true : false,
        enableStatisticsChart: this.properties.enableStatisticsChart,
        prop: this.properties,
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField("serverURL", {
                  label: "Backend URL",
                }),
                PropertyPaneToggle("enableDrillDown", {
                  label: "Drill Down Chart",
                  key: "drilldown",
                  checked: this.properties.enableDrillDown,
                }),
                PropertyPaneToggle("enableStatisticsChart", {
                  label: "Test Statistik Chart",
                  key: "statistics",
                  checked: this.properties.enableStatisticsChart,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
