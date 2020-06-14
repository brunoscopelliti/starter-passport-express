const setupApiRouter = require("server/routing/api");

class RoutingTask {
  constructor () {
    this.name = "ROUTING";
  }

  run (app) {
    const {
      PORT,
      TITLE,
    } = process.env;

    app.get("/", (req, res, next) => {
      res.render("index", {
        port: PORT,
        title: TITLE,
        User: req.user,
      });
    });

    setupApiRouter(app);
  }
}

module.exports = RoutingTask;
