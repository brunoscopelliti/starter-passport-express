const cookieParser = require("cookie-parser");
const session = require("cookie-session");

class CookieParserTask {
  constructor () {
    this.name = "COOKIEPARSERS";
  }

  run (app) {
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const secretKey = "coo-s-" + String(Math.random()).slice(2);

    app.use(cookieParser(secretKey));

    app.use(session({
      httpOnly: true,
      keys: [secretKey],
      maxAge: sevenDays,
      name: "session",
      signed: true,
    }));
  }
}

module.exports = CookieParserTask;
