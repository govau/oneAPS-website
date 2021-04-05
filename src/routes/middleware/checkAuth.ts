import * as express from "express";
import { User } from "../../entity/User";

export const checkAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userId } = req.session;

  if (!userId) {
    return res.render("403", {
      errorMessage:
        "You are not authorised to view this page. Please create an account or login",
    });
  }

  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    return res.render("403", {
      errorMessage:
        "You are not authorised to view this page. Please create an account or login",
    });
  }

  // make sure pressing back button is invalidated
  // https://stackoverflow.com/questions/6096492/node-js-and-express-session-handling-back-button-problem
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );

  next();
};
