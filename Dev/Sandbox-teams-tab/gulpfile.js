"use strict";

// check if gulp dist was called
if (process.argv.indexOf("dist") !== -1) {
  // add ship options to command call
  process.argv.push("--ship");
}

const build = require("@microsoft/sp-build-web");
const gulp = require("gulp");
const gulpSequence = require("gulp-sequence");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

gulp.task("dist", gulpSequence("clean", "bundle", "package-solution"));

build.initialize(gulp);
