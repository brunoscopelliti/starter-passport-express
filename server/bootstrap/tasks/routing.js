const setupApiRouter = require("server/routing/api");

class RoutingTask {
  constructor () {
    this.name = "ROUTING";
  }

  run (app) {
    const config = app.get("config");

    app.get("/", (req, res, next) => {
      res.render("index", {
        port: config.PORT,
        title: config.TITLE,
        User: req.user,
      });
    });

    setupApiRouter(app);
  }
}

module.exports = RoutingTask;
