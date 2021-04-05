import * as express from "express";

const adminRouter = express.Router();

adminRouter.get("/", async (req, res, next) => {
  return res.render("admin");
});

export default adminRouter;
