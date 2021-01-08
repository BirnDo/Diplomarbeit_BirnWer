const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const index = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(index);

app.listen(port);
console.log("Listening on Port " + port);

module.exports = app;
