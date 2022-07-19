import { Router } from "express";

import multer from "multer";

import uploadConfig from "../config/upload";
import { AdmController } from "../controllers/AdmController";

const upload = multer(uploadConfig);
const adminController = new AdmController();

export const admRouter = Router();

admRouter.get("/users", adminController.listUsers);
admRouter.get("/user/:id", adminController.showUser);
admRouter.put("/user/ability", adminController.abilityUser);
admRouter.get("/bids", adminController.listBidsItem);
admRouter.post("/auctions", upload.single("edital"), adminController.createAuction);
admRouter.post("/lots", adminController.createLot);
admRouter.post("/items", upload.array("images"), adminController.createItems);
admRouter.post("/categories", adminController.createCategory);
admRouter.post("/subcategories", adminController.createSubcategory);
admRouter.get("/request-ability", adminController.listRequestAbility);
admRouter.get("/request-ability/:id", adminController.listRequestAbilityUser);
admRouter.put("/request-ability", adminController.updateRequestAbility);