import { Repository } from "typeorm";
import dataSource from "../database";
import { EnableInItem } from "../entities/EnableInItem";
import { EnableInLot } from "../entities/EnableInLot";


interface IRequest {
  user_id: string;
  id: string;
  type: "lot" | "item"
}



class AdmUpdateRequestAbilitesService {
  private enableItemRepository: Repository<EnableInItem>;
  private enableInLotRepository: Repository<EnableInLot>;

  constructor() {
    this.enableItemRepository = dataSource.getRepository(EnableInItem);
    this.enableInLotRepository = dataSource.getRepository(EnableInLot);
  }
  public async execute({ user_id, id, type }: IRequest): Promise<EnableInItem | EnableInLot> {

    if (!user_id || !id || !type ) {
      throw new Error("Dados incompletos na requisição");
    }

    if(type === "lot"){
      const enable = await this.enableInLotRepository.findOneBy({id})

      if(!enable){
        throw new Error("Lote não encontrado!");
      }

      enable.status = '1';
      await this.enableInLotRepository.save(enable);

      return enable
    }

    if(type === "item"){
      const enable = await this.enableItemRepository.findOneBy({id})

      if(!enable){
        throw new Error("Lote não encontrado!");
      }

      enable.status = '1';
      await this.enableItemRepository.save(enable);

      return enable
    }
    
  }
}

export default AdmUpdateRequestAbilitesService;