import * as express from "express";
import * as yup from "yup";
import { User } from "../../entity/User";
import { formatYupError } from "../../util/formatYupError";
import { emailValidator, passwordValidator } from "../../util/yup";

import * as bcrypt from "bcryptjs";
import {
  ENVIRONMENT,
  redis_client,
  REDIS_FORGOT_PASSWORD_PREFIX,
  USER_SESSION_PREFIX,
} from "../../util/constants";
import {
  IForgotPasswordType,
  ILoginType,
  IResetPasswordType,
} from "../../types/schema";
import { removeSessions } from "../../util/removeAllUserSession";
import { createForgotPasswordLink } from "../../util/sendPasswordResetEmail/createForgotPasswordLink";
import { ESRCH } from "constants";

const loginValidationSchema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
});

const loginRouter = express.Router();

loginRouter.get("/login", async (req, res, next) => {
  return res.render("login");
});

loginRouter.post("/login", async (req, res, next) => {
  const args: ILoginType = req.body;

  try {
    await loginValidationSchema.validate(args, { abortEarly: false });
  } catch (errors) {
    return res.render("login", { errors: formatYupError(errors) });
  }
  const email = args.email.trim().toLowerCase();
  const { password } = args;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.render("login", {
      errorMessage: "Email or password is invalid",
    });
  }

  //compare password to db
  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.render("login", {
      errorMessage: "Email or password is invalid",
    });
  }

  if (!user.verified) {
    return res.render("login", {
      errorMessage: "User is not verified",
    });
  }

  ////express-session will store this in a cookie
  req.session.userId = user.id;

  //https://www.npmjs.com/package/express-session#reqsessionid
  if (req.sessionID) {
    //add prefix so its easier to see keys in redis
    //store all sessions of the user
    await redis_client.lpush(`${USER_SESSION_PREFIX}${user.id}`, req.sessionID);
  }

  return res.redirect("/admin");
});

export default loginRouter;
