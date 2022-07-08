import { Request, Response } from "express";
import AdmCreateAuctionService from "../services/AdmCreateAuctionService";
import AdmCreateCategoryService from "../services/AdmCreateCategoryService";
import AdmCreateItemService from "../services/AdmCreateItemService";
import AdmCreateLotService from "../services/AdmCreateLotService";
import AdmCreateSubcategoryService from "../services/AdmCreateSubcategoryService";
import AdmListRequestAbilitesService from "../services/AdmListRequestAbilitesService";
import AdmLisUsersService from "../services/AdmListUsersService";
import AdmUpdateRequestAbilitesService from "../services/AdmUpdateRequestAbilitesService";
import CreateUploadImageService from "../services/UploadImagesService";

interface IFile extends Express.Multer.File {
  key: string;
  location: string;
}

export class AdmController {
  async listUsers(req: Request, res: Response): Promise<Response> {

    const { id } = req.user
    try {
      const userService = new AdmLisUsersService();

      const user = await userService.execute({ user_id: id })

      return res.status(200).json(user); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createCategory(req: Request, res: Response): Promise<Response> {

    const { id } = req.user
    const { description } = req.body

    try {
      const categoryService = new AdmCreateCategoryService();

      const category = await categoryService.execute({
        user_id: id,
        description,
      })

      return res.status(201).json(category); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createSubcategory(req: Request, res: Response): Promise<Response> {

    const { id } = req.user
    const { description, category_id } = req.body

    try {
      const subcategoryService = new AdmCreateSubcategoryService();

      const subcategory = await subcategoryService.execute({
        user_id: id,
        description,
        category_id
      })

      return res.status(201).json(subcategory); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createAuction(req: Request, res: Response): Promise<Response> {

    const { id } = req.user
    const { cod_leilao, type_auction, data_realizacao, description } = req.body
    const edital = req.file;

    try {
      const auctionService = new AdmCreateAuctionService();

      const auction = await auctionService.execute({
        user_id: id,
        cod_leilao,
        type_auction,
        url_edital: edital.destination,
        data_realizacao,
        description,
        is_active: 1
      })

      return res.status(201).json(auction); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createLot(req: Request, res: Response): Promise<Response> {

    const { id } = req.user
    const {
      auction_id,
      cod_lot,
      description,
      avaliation,
      first_open,
      second_open,
      close,
      org_avaliation,
      initial_bid1,
      initial_bid2,
    } = req.body

    try {
      const lotService = new AdmCreateLotService();

      const lot = await lotService.execute({
        user_id: id,
        auction_id,
        cod_lot,
        description,
        avaliation,
        first_open,
        second_open,
        close,
        org_avaliation,
        initial_bid1,
        initial_bid2,
        is_active: 1
      })

      return res.status(201).json(lot); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createItems(req: Request, res: Response): Promise<Response> {

    const { id } = req.user
    const {
      lot_id,
      cod_item,
      avaliation,
      description,
      org_avaliation,
      initial_bid1,
      initial_bid2,
      zipcode,
      street,
      number,
      complement,
      region,
      state,
      city,
      subcategory_id,
      destaq,
    } = req.body

    const images = req.files as [];
    const images_url = images.map((document: IFile) => {
      return document.location;
    });

    try {
      const itemService = new AdmCreateItemService();
      const imageService = new CreateUploadImageService();

      const item = await itemService.execute({
        user_id: id,
        lot_id,
        subcategory_id,
        cod_item,
        avaliation,
        description,
        org_avaliation,
        initial_bid1,
        initial_bid2,
        zipcode,
        street,
        number,
        complement,
        region,
        state,
        city,
        destaq,
        is_active: 1
      });

      const images = await imageService.execute({ images_url, item_id: item.id, user_id: id })

      return res.status(201).json({ item, images }); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listRequestAbility(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    try {
      const listService = new AdmListRequestAbilitesService();

      const list = await listService.execute({ user_id: id });

      return res.status(201).json(list); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateRequestAbility(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { type, id } = req.body;
    try {
      const abilityService = new AdmUpdateRequestAbilitesService();

      const ability = await abilityService.execute({ user_id, type, id });

      return res.status(201).json(ability); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}