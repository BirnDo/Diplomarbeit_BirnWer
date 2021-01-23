import { model, Schema, Document } from "mongoose";

const testCaseSchema = new Schema({
  title: String,
  description: String,
  status: Boolean,
  active: Boolean,
  comments: String,
  image: String,
  optional: Boolean,
});

const testDefinitionSchema = new Schema({
  name: String,
  createdOn: String,
  testCases: [testCaseSchema],
  tester: String,
  finished: Boolean,
  deadline: String,
  channelID: String,
});

export interface TestCase {
  title: String;
  description: String;
  status: Boolean;
  active: Boolean;
  comments: String;
  image: String;
  optional: Boolean;
}

export interface TestDefinition extends Document {
  name: String;
  createdOn: String;
  testCases: [TestCase];
  tester: String;
  finished: Boolean;
  deadline: String;
  channelID: String;
}

export interface MinimalDefinition {
  _id: any;
  tester: String;
  createdOn: String;
  deadline: String;
  finished: Boolean;
  __v: number;
  name: String;
  channelID: String;
}

export default model<TestDefinition>("TestDefintion", testDefinitionSchema);
