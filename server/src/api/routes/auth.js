import { Router } from "express";
import Logger from "../../base/logger";
import AuthService from "../../services/auth";
const app = Router();

export default () => {
  app.post("/signup", async (req, res, next) => {
    console.log(req.body)
    Logger.debug("[Sign Up] with data: %o", req.body);
    try {
      const { user, token } = await AuthService.signUp(req.body);
      return res.status(201).json({ user, token });
    } catch (e) {

      return next(e);
    }
  });

  app.post("/login", async (req, res, next) => {
    Logger.debug("[Login] with data: %o", req.body);
    try {
      const { user, token } = await AuthService.login(req.body);
      return res.status(201).json({ user, token });
    } catch (e) {
     
      return next(e);
    }
  });

  return app;
};
