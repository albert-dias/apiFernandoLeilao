import { Repository } from "typeorm";
import dataSource from "../database";
import { BidItem } from "../entities/BidItem";
import { Item } from "../entities/Item";

interface IRequest{
  user_id: string;
  value: string;
  item_id: string;
}

class ItemCreateBidService {
  private itemsRepository: Repository<Item>;
  private itemsBidRepository: Repository<BidItem>

  constructor() {
    this.itemsRepository = dataSource.getRepository(Item);
    this.itemsBidRepository = dataSource.getRepository(BidItem);
  }
  public async execute({user_id, value, item_id}: IRequest): Promise<BidItem> {

    const itemExists = await this.itemsRepository.findOneBy({id: item_id});

    if(!itemExists){
      throw new Error("Este item não existe");
    }

    if(itemExists.is_active === '0'){
      throw new Error("Este item foi arrematado ou cancelado");
    }
    
    const bid = this.itemsBidRepository.create({
      user_id,
      value,
      item_id
    })

    await this.itemsBidRepository.save(bid)

    return bid;
  }
}

export default ItemCreateBidService;