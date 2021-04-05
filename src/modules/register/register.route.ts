import * as express from "express";
import * as yup from "yup";
import { IUserType } from "../../types/schema";
import { formatYupError } from "../../util/formatYupError";
import { emailValidator, passwordValidator } from "../../util/yup";

import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { CreateConfirmationLink } from "../../util/sendConfirmationEmail/createConfirmationLink";
import {
  ENVIRONMENT,
  error_invalidConfirmationLink,
  error_userAlreadyExists,
  error_userCreatedNotVerified,
  redis_client,
  REDIS_CONFIRMATION_EMAIL_PREFIX,
} from "../../util/constants";

const registerRouter = express.Router();

const validationSchema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
  name: yup.string().required("Enter a name").trim().min(2).max(30),
});

registerRouter.post("/register", async (req, res, next) => {
  const args: IUserType = req.body;
  let errorList;
  try {
    await validationSchema.validate(args, { abortEarly: false });
  } catch (errors) {
    errorList = formatYupError(errors);
    return res
      .status(400)
      .render("register", { errors: errorList, form: args });
  }

  const email = args.email.trim().toLowerCase();
  const password = bcrypt.hashSync(args.password, 10);
  const name = args.name.trim();

  const userAlreadyExists = await User.findOne({
    where: { email },
    select: ["email", "verified"],
  });

  if (userAlreadyExists && !userAlreadyExists.verified) {
    return res.status(409).render("register", {
      errorMessage: error_userCreatedNotVerified(userAlreadyExists.email),
    });
  }

  if (userAlreadyExists) {
    return res.status(409).render("register", {
      errorMessage: error_userAlreadyExists,
    });
  }

  const user = User.create({ email, name, password });

  //   await sendConfirmationEmail(email, name, confirmationLink);
  //   await sendSignUpMessage(name, role, email);

  await user.save();

  // get full url to be used in to create confirmation link
  const url = req.protocol + "://" + req.get("host");

  const confirmationLink = await CreateConfirmationLink(user.id, url);
  if (ENVIRONMENT !== "production") {
    console.log(confirmationLink);
  }

  req.session.email = email; // can use this data in the confirmation page
  return res.status(200).redirect("/confirmation-email");
});

registerRouter.get("/register", async (req, res, next) => {
  res.render("register");
});

// id is the redis key
registerRouter.get("/activate-user/:id", async (req, res, next) => {
  const { id } = req.params;

  const userID = await redis_client.get(
    `${REDIS_CONFIRMATION_EMAIL_PREFIX}${id}`
  );
  const user = await User.findOne({ where: { id: userID } });

  //invalid confirmation link
  if (!user) {
    return res.status(400).render("confirmed", {
      errorMessage: error_invalidConfirmationLink,
    });
  }

  //If user is already verified delete key and redirect to login page
  if (user && user.verified) {
    await redis_client.del(`${REDIS_CONFIRMATION_EMAIL_PREFIX}${id}`);
    return res.status(400).redirect("/login");
  }

  //user is not verified, they'll become verified
  if (!user.verified) {
    User.update({ id: user.id }, { verified: true });
    //delete redis key once it has been used
    await redis_client.del(`${REDIS_CONFIRMATION_EMAIL_PREFIX}${id}`);

    return res.status(200).render("confirmed", {
      alert: "Your account has been verified",
    });
  }
});

registerRouter.get("/confirmation-email", async (req, res, next) => {
  const { email } = req.session;

  //reset session variable
  req.session.email = undefined;
  if (!email) {
    return res.redirect("/register");
  }

  return res.render("confirmation", { email: email });
});

export default registerRouter;
