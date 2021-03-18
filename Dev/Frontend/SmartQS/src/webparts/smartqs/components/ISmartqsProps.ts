import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClientFactory } from "@microsoft/sp-http";
export interface ISmartqsProps {
  context: WebPartContext;
  enableDrillDown: boolean;
  enableStatisticsChart: boolean;

  aadClient: AadHttpClientFactory;
}
