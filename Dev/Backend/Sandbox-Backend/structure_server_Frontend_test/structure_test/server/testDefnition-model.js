const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testCaseSchema = new Schema({
  title: String,
  description: String,
  status: String,
  active: Boolean,
  comments: String,
  image: String,
});

const testDefinitionSchema = new Schema({
  name: String,
  createdOn: String,
  testCases: [testCaseSchema],
  testers: [String],
  finished: Boolean,
  deadline: String,
});

const TestDefinition = mongoose.model("TestDefinition", testDefinitionSchema);
module.exports = TestDefinition;
