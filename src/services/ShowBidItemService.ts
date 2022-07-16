import { Repository } from "typeorm";
import dataSource from "../database";
import { BidItem } from "../entities/BidItem";


interface IRequest {
  id: string;
}

interface IResposnse {
  id: string;
  quantity:number;
  bid: BidItem[]
}

class ShowBidItemService {
  private bidItemsRepository: Repository<BidItem>;

  constructor() {
    this.bidItemsRepository = dataSource.getRepository(BidItem);
  }
  public async execute({ id }: IRequest): Promise<IResposnse> {

    if (!id) {
      throw new Error("Dados incompletos!")
    }

    const bid = await this.bidItemsRepository.find({
      where: {
        item_id: id
      },
      relations:['user'],
      order: {
        created_at: "DESC"
      }
    });

    if(!bid){
      throw new Error("Não existem lances!")
    }

    return {
      id,
      quantity: bid.length,
      bid
    };
  }
}

export default ShowBidItemService;