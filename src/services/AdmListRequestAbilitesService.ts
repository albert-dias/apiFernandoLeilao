import { Repository } from "typeorm";
import dataSource from "../database";
import { EnableInItem } from "../entities/EnableInItem";
import { EnableInLot } from "../entities/EnableInLot";

interface IRequest {
  user_id: string;
}

interface IResponse {
  requestInLot: EnableInLot[];
  requestInItem: EnableInItem[];
}

class AdmListRequestAbilitesService {
  private enableItemRepository: Repository<EnableInItem>;
  private enableInLotRepository: Repository<EnableInLot>;

  constructor() {
    this.enableItemRepository = dataSource.getRepository(EnableInItem);
    this.enableInLotRepository = dataSource.getRepository(EnableInLot);
  }
  public async execute({ user_id }: IRequest): Promise<IResponse> {

    if (!user_id ) {
      throw new Error("Dados incompletos na requisição");
    }

    const requestInLot = await this.enableInLotRepository.find({
      where: {
        status: "0",
        lot: {
          is_active: "1"
        }
      },
      relations:["lot", "lot.auction"]
    });

    const requestInItem = await this.enableItemRepository.find({
      where: {
        status: "0",
        item: {
          is_active: "1"
        },
      },
      relations:["item","item.lot","item.lot.auction"]
    })

    return {
      requestInItem,
      requestInLot
    }
  }
}

export default AdmListRequestAbilitesService;