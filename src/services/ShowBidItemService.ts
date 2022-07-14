import { Repository } from "typeorm";
import dataSource from "../database";
import { BidItem } from "../entities/BidItem";


interface IRequest {
  id: string;
}

interface IResposnse {
  id: string;
  quantity:number;
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
    });

    if(!bid){
      throw new Error("Usuário não existe!")
    }

    return {
      id,
      quantity: bid.length
    };
  }
}

export default ShowBidItemService;