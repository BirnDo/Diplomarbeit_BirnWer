import TestCaseModel from "./TestCaseModel";

export default interface TestRunModel {
  _id: string;
  title: string;
  createdOn: string;
  testCases: TestCaseModel[];
}
