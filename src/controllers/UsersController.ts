import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ShowMyUserService from "../services/ShowMyUserService";
import CreateUploadService from "../services/UploadDocService";
import UserCheckAbilitesService from "../services/UserCheckAbilitesService";
import UserRequestAbilitesService from "../services/UserRequestAbilitesService";

interface IFile extends Express.Multer.File {
  key: string;
  location: string;
}

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name, document, identity, mail, phone, whatsapp, birth, job, marital, naturalness, nationality,
        fatherName, motherName, maritalName, maritalDocument, maritalIdentity, userName, pass, zipcode,
        street, number, complement, region, city, state
      } = req.body;

      const documents = req.files as [];

      console.log(documents)

      const documents_url = documents.map((document: IFile) => {
        return document.location;
      });

      const userService = new CreateUserService();

      const user = await userService.execute({
        name, document, identity, mail, phone, whatsapp, birth, job, marital,
        naturalness, nationality, fatherName, motherName, maritalName, maritalDocument, maritalIdentity, userName,
        pass, zipcode, street, number, complement, region, city, state
      });

      const docService = new CreateUploadService()

      await docService.execute({ user_id: user.id, documents_url })

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    try {
      const userService = new ShowMyUserService();

      const user = await userService.execute({ user_id: id })

      return res.status(200).json(user); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async checkAbility(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    try {
      const abilitiesService = new UserCheckAbilitesService()

      const myAbilities = await abilitiesService.execute( {user_id: id} )

      return res.status(201).json(myAbilities); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createAbility(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { is_type, type_id} = req.body
    try {
      const abilitiesService = new UserRequestAbilitesService()

      const myAbilities = await abilitiesService.execute( {user_id: id, type: is_type, id: type_id} )

      return res.status(201).json(myAbilities); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    // Metodo de criação de conexão do chat
    try {


      return res.status(201).json(); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async recoveryPass(req: Request, res: Response): Promise<Response> {
    try {


      return res.status(201).send(); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async checkCode(req: Request, res: Response): Promise<Response> {
    try {

      return res.status(201).send(); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updatePass(req: Request, res: Response): Promise<Response> {
    try {

      return res.status(201).json(); // retora a conexão
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
