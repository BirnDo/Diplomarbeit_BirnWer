import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISmartQSNavProps {
  serverURL: string;
  teamsContext: any;
  enableDrillDown: boolean;
  enableStatisticsChart: boolean;
}
