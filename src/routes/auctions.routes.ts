import { Router } from "express";

import multer from "multer";

import uploadConfig from "../config/upload";
import { AuctionsController } from "../controllers/AuctionsController";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig);
const auctionController = new AuctionsController();

export const auctionRouter = Router();

auctionRouter.get("/", auctionController.listAuctions);
auctionRouter.get("/subcategories", auctionController.listSubcategories);
auctionRouter.get("/categories", auctionController.listCategories);
auctionRouter.get("/lots", auctionController.listLots);
auctionRouter.get("/items", auctionController.listItems);
auctionRouter.get("/old", auctionController.listOldItems);
auctionRouter.get("/lots/:auction_id", auctionController.listLotsAuction);
auctionRouter.get("/items/:lot_id", auctionController.listItemsLot);
auctionRouter.get("/:id", auctionController.showAuction);
auctionRouter.get("/lot/:id", auctionController.showLot);
auctionRouter.get("/item/:id", auctionController.showItem);
auctionRouter.post("/lot/bid", ensureAuthenticate, auctionController.bidLot);
auctionRouter.post("/item/bid", ensureAuthenticate, auctionController.bidItem);
