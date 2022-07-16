import { Repository } from "typeorm";
import dataSource from "../database";
import { BidItem } from "../entities/BidItem";


class ListBidsItemService {
  private bidItemsRepository: Repository<BidItem>;

  constructor() {
    this.bidItemsRepository = dataSource.getRepository(BidItem);
  }
  public async execute(): Promise<BidItem[]> {

    const bid = await this.bidItemsRepository.find({
      relations:['user'],
      order: {
        created_at: "DESC"
      },
      take: 10,
    });

    if(!bid){
      throw new Error("Não existem lances") 
    }

    return bid;
  }
}

export default ListBidsItemService;