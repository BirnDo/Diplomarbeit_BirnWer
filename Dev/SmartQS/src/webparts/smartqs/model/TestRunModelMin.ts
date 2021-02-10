export default interface TestRunModelMin {
  _id: string;
  name: string;
  createdOn: string;
  channelID: string;
  finished: boolean;
  deadline: string;
  tester: string;
  doneOn: string;
}
