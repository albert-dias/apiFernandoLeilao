import { Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";

interface IRequest {
  auction_id: string;
}

class AuctionShowService {
  private auctionsRepository: Repository<Auction>;

  constructor() {
    this.auctionsRepository = dataSource.getRepository(Auction);
  }
  public async execute({ auction_id }: IRequest): Promise<Auction> {

    if (!auction_id) {
      throw new Error("Dados incompletos!")
    }

    const auction = await this.auctionsRepository.findOne({
      where: {
        id: auction_id
      },
      relations:["lots", "lots.items", "lots.items.images" ]
    });

    console.log(auction)

    if(!auction){
      throw new Error("Usuário não existe!")
    }


    return auction;
  }
}

export default AuctionShowService;