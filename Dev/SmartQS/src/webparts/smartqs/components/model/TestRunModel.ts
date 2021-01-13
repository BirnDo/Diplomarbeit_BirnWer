import TestCaseModel from "./TestCaseModel";

export default interface TestRunModel {
  _id: string;
  name: string;
  createdOn: string;
  tester: string;
  finished: boolean;
  deadline: string;
  testCases: TestCaseModel[];
}
