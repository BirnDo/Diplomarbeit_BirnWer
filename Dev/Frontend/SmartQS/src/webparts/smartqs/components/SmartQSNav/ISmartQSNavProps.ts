import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClientFactory } from "@microsoft/sp-http";
export interface ISmartQSNavProps {
  serverURL: string;
  teamsContext: any;
  enableDrillDown: boolean;
  enableStatisticsChart: boolean;
  aadClient: AadHttpClientFactory;
}
