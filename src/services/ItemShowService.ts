import { Repository } from "typeorm";
import dataSource from "../database";
import { Item } from "../entities/Item";

interface IRequest {
  item_id: string;
}

class ItemShowService {
  private itemsRepository: Repository<Item>;

  constructor() {
    this.itemsRepository = dataSource.getRepository(Item);
  }
  public async execute({ item_id }: IRequest): Promise<Item> {

    if (!item_id) {
      throw new Error("Dados incompletos!")
    }

    const item = await this.itemsRepository.findOne({
      where: {
        id: item_id
      },
      relations:['lot', 'lot.auction','images']
    });

    if(!item){
      throw new Error("Usuário não existe!")
    }

    return item;
  }
}

export default ItemShowService;