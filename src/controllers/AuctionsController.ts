import { Billingconductor } from "aws-sdk";
import { Request, Response } from "express";
import AuctionListService from "../services/AuctionListService";
import AuctionShowService from "../services/AuctionShowService";
import CategoryListService from "../services/CategoryListService";
import ItemCreateBidService from "../services/ItemCreateBidService";
import ItemListService from "../services/ItemListService";
import ItemShowService from "../services/ItemShowService";
import ItemsLotListService from "../services/ItemsLotListService";
import LotCreateBidService from "../services/LotCreateBidService";
import LotListService from "../services/LotListService";
import LotsAuctionListService from "../services/LotsAuctionListService";
import LotShowService from "../services/LotShowService";
import SubcategoryListService from "../services/SubCategoryListService";
import UpdateItemCloseService from "../services/UpdateItemCloseService";

interface IFile extends Express.Multer.File {
  key: string;
  location: string;
}

export class AuctionsController {
  async listAuctions(req: Request, res: Response): Promise<Response> {
    try {
      const auctionService = new AuctionListService();

      const auctions = await auctionService.execute()

      return res.status(200).json(auctions); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listLots(req: Request, res: Response): Promise<Response> {
    try {
      const lotService = new LotListService();

      const lots = await lotService.execute()

      return res.status(200).json(lots); 
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listItems(req: Request, res: Response): Promise<Response> {
    try {
      const itemService = new ItemListService();

      const items = await itemService.execute()

      return res.status(200).json(items); 
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listLotsAuction(req: Request, res: Response): Promise<Response> {
    const { auction_id } = req.params;
    try {
      const lotService = new LotsAuctionListService();

      const lots = await lotService.execute({auction_id})

      return res.status(200).json(lots); 
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listItemsLot(req: Request, res: Response): Promise<Response> {
    const { lot_id } = req.params;
    try {
      const itemService = new ItemsLotListService();

      const items = await itemService.execute({lot_id})

      return res.status(200).json(items); 
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listSubcategories(req: Request, res: Response): Promise<Response> {
    try {
      const subcategoryService = new SubcategoryListService();

      const subcategories = await subcategoryService.execute()

      return res.status(200).json(subcategories); 
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listCategories(req: Request, res: Response): Promise<Response> {
    try {
      const categoryService = new CategoryListService();

      const categories = await categoryService.execute()

      return res.status(200).json(categories); 
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async showAuction(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      const auctionService = new AuctionShowService();

      const auction = await auctionService.execute({auction_id: id})

      return res.status(200).json(auction); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async showLot(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      const lotService = new LotShowService();

      const lot = await lotService.execute({lot_id: id})

      return res.status(200).json(lot); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async showItem(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      const itemService = new ItemShowService();

      const item = await itemService.execute({item_id: id})
      

      return res.status(200).json(item); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async bidLot(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { lot_id, value } = req.body;
    try {

      const bidService = new LotCreateBidService();

      const bid = await bidService.execute({ user_id: id, lot_id, value})

      return res.status(201).json({bid}); // retorna a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async bidItem(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { item_id, value } = req.body;
    try {

      const bidService = new ItemCreateBidService();

      const bid = await bidService.execute({ user_id: id, item_id, value})

      return res.status(201).json(bid); // retorna a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

}
