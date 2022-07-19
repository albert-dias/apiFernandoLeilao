import { Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";
import { EnableInItem } from "../entities/EnableInItem";
import { EnableInLot } from "../entities/EnableInLot";
import { Item } from "../entities/Item";
import { Lot } from "../entities/Lot";

interface IRequest {
  user_id: string;
  type: 'item' | 'lot';
  id: string;
}

class UserRequestAbilitesService {
  private enableItemRepository: Repository<EnableInItem>;
  private enableInLotRepository: Repository<EnableInLot>;
  private itemRepository = dataSource.getRepository(Item);
  private lotRepository = dataSource.getRepository(Lot);

  constructor() {
    this.enableItemRepository = dataSource.getRepository(EnableInItem);
    this.enableInLotRepository = dataSource.getRepository(EnableInLot);
    this.itemRepository = dataSource.getRepository(Item);
    this.lotRepository = dataSource.getRepository(Lot);
  }
  public async execute({ user_id, type, id }: IRequest): Promise<EnableInLot | EnableInItem> {

    if (!user_id || !type || !id) {
      throw new Error("Dados incompletos na requisição");
    }

    if (type === "lot") {
      const lotExists = await this.lotRepository.findOneBy({id})

      if(!lotExists){
        throw new Error("Lote nao existe ou foi desativado") 
      }

      const requestExists = await this.enableInLotRepository.find({
        where: {
          user_id,
          lot_id: id
        }
      });

      if(requestExists.length>0){
        throw new Error("Você já fez uma requisição para este Lote")
      }

      const enable = this.enableInLotRepository.create({
        user_id,
        lot_id: id,
        status: '0'
      })


      await this.enableInLotRepository.save(enable)

      return enable;
    }

    if (type === "item") {
      const itemExists = await this.itemRepository.findOneBy({id})

      if(!itemExists){
        throw new Error("Item nao existe ou foi desativado") 
      }

      const requestExists = await this.enableItemRepository.find({
        where: {
          user_id,
          item_id: id
        }
      });

      if(requestExists.length>0){
        throw new Error("Você já fez uma requisição para este Item")
      }

      const enable = this.enableItemRepository.create({
        user_id,
        item_id: id,
        status: '0'
      })

      await this.enableItemRepository.save(enable)

      return enable;
    }

  }
}

export default UserRequestAbilitesService;