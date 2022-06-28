import { Repository } from "typeorm";
import dataSource from "../database";
import { Lot } from "../entities/Lot";

class LotListService {
  private lotsRepository: Repository<Lot>;

  constructor() {
    this.lotsRepository = dataSource.getRepository(Lot);
  }
  public async execute(): Promise<Lot[]> {

    const lots = await this.lotsRepository.find();

    return lots;
  }
}

export default LotListService;