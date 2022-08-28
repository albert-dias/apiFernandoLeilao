import { LessThan, MoreThanOrEqual, Repository } from "typeorm";
import dataSource from "../database";
import { Item } from "../entities/Item";

class ItemOldListService {
  private itemsRepository: Repository<Item>;

  constructor() {
    this.itemsRepository = dataSource.getRepository(Item);
  }
  public async execute(): Promise<Item[]> {

    const items = await this.itemsRepository.find({ 
      where:{
        close: LessThan(new Date()),
      },
      relations: ["lot","images", "lot.auction"] });

    return items;
  }
}

export default ItemOldListService;