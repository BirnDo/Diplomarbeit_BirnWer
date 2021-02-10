import TestCaseModel from "./TestCaseModel";

export default interface TestRunModel {
  _id: string;
  name: string;
  createdOn: string;
  channelID: string;
  finished: boolean;
  deadline: string;
  tester: string;
  testCases: TestCaseModel[];
}
