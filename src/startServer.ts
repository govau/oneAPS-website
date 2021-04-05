import "reflect-metadata";
import * as hbs from "express-handlebars";
import * as express from "express";
import * as helmet from "helmet";
import { connection } from "./util/createConnection";
import registerRouter from "./modules/register/register.route";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as connect_redis from "connect-redis";
import { redis_client, REDIS_PREFIX, sessionSecret } from "./util/constants";
import adminRouter from "./modules/admin/admin.routes";
import { checkAuth } from "./modules/middleware/checkAuth";
import loginRouter from "./modules/login/login.routes";
import resetPasswordRouter from "./modules/resetPassword/resetPassword.router";
import logoutRouter from "./modules/logout/logout.routes";
const path = require("path");

const PORT = process.env.PORT || 3000;

const RedisStore = connect_redis(session);

export const startServer = async () => {
  const app = express();
  app.use(helmet());
  console.log(path.join(__dirname, "../static"));
  app.use(express.static(path.join(__dirname, "../static")));
  app.engine("handlebars", hbs());
  app.set("view engine", "handlebars");
  app.use(bodyParser.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  ); //FIX

  app.use(
    session({
      name: "sid",
      store: new RedisStore({ client: redis_client, prefix: REDIS_PREFIX }),
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false, //Don't create cookie until we store data on the user
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, //1000 * 60 * 60 * 24 * 7,  7 days
      },
    })
  );

  await connection.create();

  app.get("/", async (req, res, next) => {
    res.render("home");
  });

  app.use("/", registerRouter);
  app.use("/", loginRouter);
  app.use("/", resetPasswordRouter);
  app.use("/", logoutRouter);
  app.use("/admin", checkAuth, adminRouter);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};
