import { Repository } from "typeorm";
import dataSource from "../database";
import { Item } from "../entities/Item";

class ItemListService {
  private itemsRepository: Repository<Item>;

  constructor() {
    this.itemsRepository = dataSource.getRepository(Item);
  }
  public async execute(): Promise<Item[]> {

    const items = await this.itemsRepository.find();

    return items;
  }
}

export default ItemListService;