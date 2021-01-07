const mongoose = require("mongoose");
const env = require("./environment/env");

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${encodeURIComponent(
  env.dbName
)}:${encodeURIComponent(env.key)}@${encodeURIComponent(
  env.dbName
)}.mongo.cosmos.azure.com:${encodeURIComponent(
  env.port
)}/?ssl=${encodeURIComponent(env.ssl)}&replicaSet=${encodeURIComponent(
  env.replicaSet
)}&retrywrites=${encodeURIComponent(
  env.retrywrites
)}&maxIdleTimeMS=${encodeURIComponent(
  env.maxIdleTimeMS
)}&appName=@${encodeURIComponent(env.dbName)}@`;

function connect() {
  var test = mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: env.retrywrites,
  });

  return test;
}

module.exports = {
  connect,
  mongoose,
};
