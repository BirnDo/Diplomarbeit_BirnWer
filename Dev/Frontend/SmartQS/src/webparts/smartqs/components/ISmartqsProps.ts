import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISmartqsProps {
  context: WebPartContext;
  enableDrillDown: boolean;
  enableStatisticsChart: boolean;
}
