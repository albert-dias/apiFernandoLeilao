import { Repository } from "typeorm";
import dataSource from "../database";
import { Lot } from "../entities/Lot";

interface IRequest {
  lot_id: string;
}

class LotShowService {
  private lotsRepository: Repository<Lot>;

  constructor() {
    this.lotsRepository = dataSource.getRepository(Lot);
  }
  public async execute({ lot_id }: IRequest): Promise<Lot> {

    if (!lot_id) {
      throw new Error("Dados incompletos!")
    }

    const lot = await this.lotsRepository.findOne({
      where: {
        id: lot_id
      },
      relations:['items', 'items.images']
    });

    if(!lot){
      throw new Error("Usuário não existe!")
    }

    return lot;
  }
}

export default LotShowService;