"use strict";

const AssetsEngineTask = require("./tasks/assets");
const AuthTask = require("./tasks/auth");
const CookieParsersTask = require("./tasks/cookie-parsers");
const LogTask = require("./tasks/log");
const RequestParsersTask = require("./tasks/req-parsers");
const RoutingTask = require("./tasks/routing");
const ViewEngineTask = require("./tasks/view-engine");
const ErrorHandler = require("./tasks/error-handler");

const tasks = [
  new LogTask(),
  new CookieParsersTask(),
  new RequestParsersTask(),
  new AssetsEngineTask(),
  new AuthTask(),
  new ViewEngineTask(),
  new RoutingTask(),
  new ErrorHandler(),
];

const bootstrap =
  (app) => {
    for (const task of tasks) {
      task.run(app);
    }
  };

module.exports = bootstrap;
