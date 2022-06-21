import { Router } from "express";

import multer from "multer";

import uploadConfig from "../config/upload";
import { UsersController } from "../controllers/UsersController";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig);
const usersRoutes = Router();
const usersController = new UsersController();

export const usersRouter = Router();

usersRouter.post("/", upload.array("photos"), usersController.create)