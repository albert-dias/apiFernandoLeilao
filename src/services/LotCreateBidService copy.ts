import { Repository } from "typeorm";
import dataSource from "../database";
import { BidLot } from "../entities/BidLot";
import { Lot } from "../entities/Lot";

interface IRequest{
  user_id: string;
  value: string;
  lot_id: string;
}

class LotCreateBidService {
  private lotRepository: Repository<Lot>;
  private lotBidRepository: Repository<BidLot>

  constructor() {
    this.lotRepository = dataSource.getRepository(Lot);
    this.lotBidRepository = dataSource.getRepository(BidLot);
  }
  public async execute({user_id, value, lot_id}: IRequest): Promise<BidLot> {

    const itemExists = await this.lotRepository.findOneBy({id: lot_id});

    if(!itemExists){
      throw new Error("Este lote não existe");
    }

    if(itemExists.is_active === 's'){
      throw new Error("Este lote foi arrematado ou cancelado");
    }
    
    const bid = this.lotBidRepository.create({
      user_id,
      value,
      lot_id
    })

    await this.lotBidRepository.save(bid)

    return bid;
  }
}

export default LotCreateBidService;