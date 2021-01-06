const express = require("express");
const bodyParser = require("body-parser");

const index = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", index);

app.listen(3000);

module.exports = app;
