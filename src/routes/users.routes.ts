import { Router } from "express";

import multer from "multer";

import uploadConfig from "../config/upload";
import { UsersController } from "../controllers/UsersController";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig);
const usersController = new UsersController();

export const usersRouter = Router();

usersRouter.post("/", upload.array("documents"), usersController.create);
usersRouter.get("/me", ensureAuthenticate, usersController.show)
usersRouter.get("/get-abilities", ensureAuthenticate, usersController.checkAbility);
usersRouter.post("/ability", ensureAuthenticate, usersController.createAbility);
usersRouter.post("/news", usersController.assingNew);