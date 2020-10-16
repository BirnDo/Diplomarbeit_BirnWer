import TestCaseModel from "./TestCaseModel";

export default interface TestRunModel {
  title: string;
  createdOn: string;
  testCases: TestCaseModel[];
}
