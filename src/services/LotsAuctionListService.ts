import { MoreThanOrEqual, Repository } from "typeorm";
import dataSource from "../database";
import { Lot } from "../entities/Lot";

class LotsAuctionListService {
  private lotsRepository: Repository<Lot>;

  constructor() {
    this.lotsRepository = dataSource.getRepository(Lot);
  }
  public async execute({auction_id}): Promise<Lot[]> {

    const lots = await this.lotsRepository.find({
      where:{
        is_active: "1",
        auction_id,
        close: MoreThanOrEqual(new Date()),
      },
    });

    return lots;
  }
}

export default LotsAuctionListService;