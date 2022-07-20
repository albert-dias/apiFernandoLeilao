import { Repository } from "typeorm";
import dataSource from "../database";
import { Item } from "../entities/Item";

class ItemListService {
  private itemsRepository: Repository<Item>;

  constructor() {
    this.itemsRepository = dataSource.getRepository(Item);
  }
  public async execute(): Promise<Item[]> {

    const items = await this.itemsRepository.find({ 
      where:{
        is_active: "1",
        lot:{
          is_active: "1",
          auction: {
            is_active: 1
          }
        }
      },
      relations: ["lot","images", "lot.auction"] });

    return items;
  }
}

export default ItemListService;