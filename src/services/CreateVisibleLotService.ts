import { Repository } from "typeorm";
import dataSource from "../database";
import { VisibleLot } from "../entities/VisibleLot";

interface IRequest {
  lot_id: string;
}

class CreateVisibleLotService {
  private visibleLotRepository: Repository<VisibleLot>;

  constructor() {
    this.visibleLotRepository = dataSource.getRepository(VisibleLot);
  }
  public async execute({ 
    lot_id,
  }: IRequest): Promise<VisibleLot> {

    if ( !lot_id ) {
      throw new Error("Dados incompletos!")
    }


    const visible =  this.visibleLotRepository.create({
      lot_id,
    });

    await this.visibleLotRepository.save(visible);
    
    return visible;
  }
}

export default CreateVisibleLotService;
