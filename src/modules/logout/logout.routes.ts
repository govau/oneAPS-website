import * as express from "express";
import { removeSessions } from "../../util/removeAllUserSession";
const logoutRouter = express.Router();

logoutRouter.post("/logout", async (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    //remove all sessions associated with this userId
    await removeSessions(userId);
    res.clearCookie("sid");
    return res.redirect("/"); //FIX should redirect with data
  }
  return res.redirect("/");
});

export default logoutRouter;
