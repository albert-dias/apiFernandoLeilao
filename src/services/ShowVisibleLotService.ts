import { Repository } from "typeorm";
import dataSource from "../database";
import { VisibleLot } from "../entities/VisibleLot";


interface IRequest {
  id: string;
}

interface IResposnse {
  id: string;
  quantity:number;
}

class ShowVisibleLotService {
  private visibleItemsRepository: Repository<VisibleLot>;

  constructor() {
    this.visibleItemsRepository = dataSource.getRepository(VisibleLot);
  }
  public async execute({ id }: IRequest): Promise<IResposnse> {

    if (!id) {
      throw new Error("Dados incompletos!")
    }

    const visible = await this.visibleItemsRepository.find({
      where: {
        lot_id: id
      },
    });

    if(!visible){
      throw new Error("Usuário não existe!")
    }

    return {
      id,
      quantity: visible.length
    };
  }
}

export default ShowVisibleLotService;