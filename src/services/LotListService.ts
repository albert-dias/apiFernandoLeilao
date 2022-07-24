import { MoreThanOrEqual, Repository } from "typeorm";
import dataSource from "../database";
import { Lot } from "../entities/Lot";

class LotListService {
  private lotsRepository: Repository<Lot>;

  constructor() {
    this.lotsRepository = dataSource.getRepository(Lot);
  }
  public async execute(): Promise<Lot[]> {

    const lots = await this.lotsRepository.find({
      where: {
        is_active: "1",
        close: MoreThanOrEqual(new Date()),
        auction: {
          is_active: 1
        }
      },
      relations: ["auction", "items", "items.images"]
    });

    return lots;
  }
}

export default LotListService;