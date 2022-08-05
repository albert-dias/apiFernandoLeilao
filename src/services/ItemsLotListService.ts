import { MoreThanOrEqual, Repository } from "typeorm";
import dataSource from "../database";
import { Item } from "../entities/Item";

class ItemsLotListService {
  private itemsRepository: Repository<Item>;

  constructor() {
    this.itemsRepository = dataSource.getRepository(Item);
  }
  public async execute({lot_id}): Promise<Item[]> {

    const items = await this.itemsRepository.find({
      where:{
        is_active: "1",
        lot_id,
        lot:{
          close: MoreThanOrEqual(new Date()),
        }
      },
      relations:["images"]
    });

    return items;
  }
}

export default ItemsLotListService;