import { Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";
import { EnableInItem } from "../entities/EnableInItem";
import { EnableInLot } from "../entities/EnableInLot";

interface IRequest {
  user_id: string;
}

interface IResponse{
  lots_id: string[];
  items_id: string[];
}

class AuctionListService {
  private enableItemRepository: Repository<EnableInItem>;
  private enableInLotRepository: Repository<EnableInLot>;

  constructor() {
    this.enableItemRepository = dataSource.getRepository(EnableInItem);
    this.enableInLotRepository = dataSource.getRepository(EnableInLot);
  }
  public async execute({user_id}: IRequest): Promise<IResponse> {

    const auctions = await this.enableItemRepository.find();

    return auctions;
  }
}

export default AuctionListService;