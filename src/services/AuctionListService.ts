import { MoreThanOrEqual, Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";

class AuctionListService {
  private auctionsRepository: Repository<Auction>;

  constructor() {
    this.auctionsRepository = dataSource.getRepository(Auction);
  }
  public async execute(): Promise<Auction[]> {

    const auctions = await this.auctionsRepository.find({
      where:{
        is_active: 1,
        lots:{
          is_active: "1",
          close: MoreThanOrEqual(new Date()),
        }        
      },
      relations: ["lots","lots.items", "lots.items.images"]
    });

    return auctions;
  }
}

export default AuctionListService;