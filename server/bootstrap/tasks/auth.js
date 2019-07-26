const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

class GoolgeOAuthTask {
  constructor () {
    this.name = "AUTH";
  }

  run (app) {
    /**
     * Simulates a database.
     */
    const fakeDB = new Map();

    /**
     * Determines which data of the user object
     * is stored in the session.
     * It can be read as `req.session.passport.user`.
     */
    passport.serializeUser(
      (userId, done) => {
        done(/* error */ null, userId);
      }
    );

    /**
     * Fetch user's data, and makes them available
     * in the current request, as `req.user`.
     */
    passport.deserializeUser(
      (userId, done) => {
        done(/* error */ null, fakeDB.get(userId));
      }
    );

    const {
      HOST,
      PORT,
      OAUTH_CONFIG: {
        GOOGLE_CLIENT_ID,
        GOOGLE_SECRET_ID,
        RETURN_URL,
      },
    } = app.get("config");

    const strategyConfig = {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_ID,
      callbackURL: `${HOST}:${PORT}/${RETURN_URL}`,
      passReqToCallback: true,
    };

    const strategyFn =
      (request, accessToken, refreshToken, profile, done) => {
        if (fakeDB.has(profile.id) === false) {
          fakeDB.set(profile.id, profile);
        }

        return done(/* error */ null, profile.id);
      };

    passport.use(
      new GoogleStrategy(strategyConfig, strategyFn)
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.post("/login",
      passport.authenticate("google", { scope: ["email", "profile"] }));

    /**
     * You may need to whitelist the callback url
     * through the Google API Console.
     * In order to make it work with localhost,
     * I had to whitelist "http://127.0.0.1/auth/google/callback".
     */
    app.get("/" + RETURN_URL,
      passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/",
      })
    );
  }
}

module.exports = GoolgeOAuthTask;
