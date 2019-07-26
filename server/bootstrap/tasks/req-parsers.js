const bodyParser = require("body-parser");

class RequestParserTask {
  constructor () {
    this.name = "REQPARSERS";
  }

  run (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }
}

module.exports = RequestParserTask;
