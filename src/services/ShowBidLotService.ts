import { Repository } from "typeorm";
import dataSource from "../database";
import { BidLot } from "../entities/BidLot";


interface IRequest {
  id: string;
}

interface IResposnse {
  id: string;
  quantity:number;
}

class ShowBidLotService {
  private bidItemsRepository: Repository<BidLot>;

  constructor() {
    this.bidItemsRepository = dataSource.getRepository(BidLot);
  }
  public async execute({ id }: IRequest): Promise<IResposnse> {

    if (!id) {
      throw new Error("Dados incompletos!")
    }

    const bid = await this.bidItemsRepository.find({
      where: {
        lot_id: id
      },
    });

    if(!bid){
      throw new Error("Não existem lances!")
    }

    return {
      id,
      quantity: bid.length
    };
  }
}

export default ShowBidLotService;