
import { Router } from "express";

import AuthenticatedUserService from "../services/AuthenticatedUserService";

export const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const { mail, password } = req.body;

    const authenticateUser = new AuthenticatedUserService();

    const { user, token } = await authenticateUser.execute({
      mail,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
});
