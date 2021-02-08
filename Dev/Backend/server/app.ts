const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const port = 3000;
const index = require("./routes/index");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(index);

const options = {
  swagger: "2.0",
  swaggerDefinition: {
    info: {
      description: "This is the APi documentation of SmartQS",
      version: "1.0.0",
      title: "SmartQS",
      contact: {
        email: "40146720160258@litec.ac.at",
      },
    },
  },
  schemes: ["http"],
  host: "localhost:3000",
  basePath: "/",
  apis: ["build/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port);
console.log("Listening on Port " + port);

module.exports = app;
