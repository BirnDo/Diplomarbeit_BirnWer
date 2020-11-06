const mongoose = require("mongoose");
const env = require("./environment/environment");

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://qsadmin:${encodeURIComponent(
  env.key
)}@qsadmin.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@qsadmin@`;

function connect() {
  var test = mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false,
  });
  return test;
}

module.exports = {
  connect,
  mongoose,
};
