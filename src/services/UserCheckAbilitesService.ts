import { Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";
import { EnableInItem } from "../entities/EnableInItem";
import { EnableInLot } from "../entities/EnableInLot";

interface IRequest {
  user_id: string;
}

interface IResponse{
  lots: EnableInLot[];
  items: EnableInItem[];
}

class UserCheckAbilitesService {
  private enableItemRepository: Repository<EnableInItem>;
  private enableInLotRepository: Repository<EnableInLot>;

  constructor() {
    this.enableItemRepository = dataSource.getRepository(EnableInItem);
    this.enableInLotRepository = dataSource.getRepository(EnableInLot);
  }
  public async execute({user_id}: IRequest): Promise<IResponse> {

    const lots = await this.enableInLotRepository.find({
      where: {
        status: '1',
        user_id,
        lot: {
          is_active: '1'
        }
      }
    });


    const items = await this.enableItemRepository.find({
      where: {
        status: '1',
        user_id,
        item: {
          is_active: '1'
        }
      }
    });


    return {lots, items};
  }
}

export default UserCheckAbilitesService;