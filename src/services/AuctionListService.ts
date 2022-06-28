import { Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";

class AuctionListService {
  private auctionsRepository: Repository<Auction>;

  constructor() {
    this.auctionsRepository = dataSource.getRepository(Auction);
  }
  public async execute(): Promise<Auction[]> {

    const auctions = await this.auctionsRepository.find();

    return auctions;
  }
}

export default AuctionListService;