import { MoreThanOrEqual, Repository } from "typeorm";
import dataSource from "../database";
import { Item } from "../entities/Item";

class UpdateItemCloseService {
  private itemsRepository: Repository<Item>;

  constructor() {
    this.itemsRepository = dataSource.getRepository(Item);
  }
  public async execute({id}): Promise<Item> {

    const item = await this.itemsRepository.findOneBy({id});
    const dateA = new Date(item.close);
    const nDate = new Date(dateA.setMinutes(dateA.getMinutes()+1))
    
    console.log(dateA, nDate)
    
    item.close = nDate;
    
    await this.itemsRepository.save(item)

    return item;
  }
}

export default UpdateItemCloseService;