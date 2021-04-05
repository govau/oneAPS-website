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

const emailValidationSchema = yup.object().shape({
  email: emailValidator,
});

const passwordResetValidationSchema = yup.object().shape({
  password: passwordValidator,
});

const resetPasswordRouter = express.Router();

resetPasswordRouter.get("/forgot-password", async (req, res, next) => {
  res.render("forgot-password");
});

resetPasswordRouter.post("/forgot-password", async (req, res, next) => {
  const args: IForgotPasswordType = req.body;
  try {
    await emailValidationSchema.validate(args, { abortEarly: false });
  } catch (errors) {
    return res.render("forgot-password", { errors: formatYupError(errors) });
  }

  const { email } = args;
  const user = await User.findOne({
    where: { email },
    select: ["id", "name"],
  });

  //enters a user that does not exist
  if (!user) {
    return res.render("check-email");
  }

  //remove sessions for the user: i.e. log them out
  // removeSessions(user.id, redis_client);

  const url = req.protocol + "://" + req.get("host");

  //create forgotpassword link
  const forgotLink = await createForgotPasswordLink(user.id, url);

  if (ENVIRONMENT === "development") {
    console.log(forgotLink);
  }

  return res.render("check-email");

  //FIX SET UP NOTIFY
  // await sendForgotPasswordEmail(email, user.name, forgotLink);
});

resetPasswordRouter.get("/reset-password/:id", async (req, res, next) => {
  const id = req.params.id;
  return res.render("reset-password", { uniqueId: id });
});

resetPasswordRouter.post("/reset-password", async (req, res, next) => {
  const args: IResetPasswordType = req.body;
  try {
    await passwordResetValidationSchema.validate(args, { abortEarly: false });
  } catch (errors) {
    return res.render("reset-password", { errors: formatYupError(errors) });
  }

  const { key, password } = args;
  const redisKey = `${REDIS_FORGOT_PASSWORD_PREFIX}${key}`;

  const userId = await redis_client.get(redisKey);

  if (!userId) {
    return res.render("error", {
      errorMessage: "Expired or invalid password link",
    });
  }

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return res.render("password-reset-confirmation");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  await User.update({ id: user.id }, { password: hashedPassword }); // Update password

  await redis_client.del(redisKey); // delete password reset key

  return res.render("password-reset-confirmation");
});

export default resetPasswordRouter;
