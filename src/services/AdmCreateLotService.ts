import { Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";
import { Lot } from "../entities/Lot";
import { User } from "../entities/User";

interface IRequest {
  user_id: string;
  auction_id: string;
  cod_lot: string;
  description: string;
  avaliation: string;
  first_open: Date;
  second_open: Date;
  close: Date;
  org_avaliation: string;
  initial_bid: string;
  is_active: number;
}

class AdmCreateLotService {
  private auctionsRepository: Repository<Auction>;
  private lotsRepository: Repository<Lot>;
  private usersRepository: Repository<User>;

  constructor() {
    this.auctionsRepository = dataSource.getRepository(Auction);
    this.lotsRepository = dataSource.getRepository(Lot);
    this.usersRepository = dataSource.getRepository(User);
  }
  public async execute({ 
    user_id, 
    auction_id,
    cod_lot,
    description,
    avaliation,
    first_open,
    second_open,
    close,
    org_avaliation,
    initial_bid,
    is_active 
  }: IRequest): Promise<Lot> {

    if (!user_id || 
      !auction_id || 
      !cod_lot || 
      !first_open ||
      !close ||
      !description ||
      !initial_bid ) {
      throw new Error("Dados incompletos!")
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: user_id,
        is_adm: 1
      },
    });

    if(!user){
      throw new Error("Usuário não é administrador!")
    }

    const auctionExists = await this.auctionsRepository.findOne({
      where: {
        id: auction_id,
      }
    });

    if(!auctionExists){
      throw new Error("Leilão não encontrado!");
      
    }

    const lot =  this.lotsRepository.create({
      auction_id,
      cod_lot,
      description,
      avaliation,
      first_open,
      second_open,
      close,
      org_avaliation,
      initial_bid,
    });

    await this.lotsRepository.save(lot);
    
    return lot;
  }
}

export default AdmCreateLotService;