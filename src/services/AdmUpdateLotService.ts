import { Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";
import { Lot } from "../entities/Lot";
import { User } from "../entities/User";

interface IRequest {
  id: string;
  user_id: string;
  auction_id: string;
  cod_lot: string;
  description: string;
  avaliation: string;
  first_open: Date;
  second_open: Date;
  close: Date;
  org_avaliation: string;
  initial_bid1: string;
  initial_bid2?: string;
  is_active: number;
}

class AdmUpdateLotService {
  private auctionsRepository: Repository<Auction>;
  private lotsRepository: Repository<Lot>;
  private usersRepository: Repository<User>;

  constructor() {
    this.auctionsRepository = dataSource.getRepository(Auction);
    this.lotsRepository = dataSource.getRepository(Lot);
    this.usersRepository = dataSource.getRepository(User);
  }
  public async execute({ 
    id,
    user_id, 
    auction_id,
    cod_lot,
    description,
    avaliation,
    first_open,
    second_open,
    close,
    org_avaliation,
    initial_bid1,
    initial_bid2,
    is_active 
  }: IRequest): Promise<Lot> {

    if (
      !id ||
      !user_id || 
      !auction_id || 
      !cod_lot || 
      !first_open ||
      !close ||
      !description ||
      !initial_bid1 ) {
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

    const lotExists = await this.lotsRepository.findOneBy({id});

    if(!lotExists){
      throw new Error("Lote não encontrado!");
    }

    lotExists.id = id,
    lotExists.auction_id = auction_id,
    lotExists.cod_lot = cod_lot,
    lotExists.description = description,
    lotExists.avaliation = avaliation.replace('.','').replace(',','.'),
    lotExists.first_open = new Date(first_open),
    lotExists.second_open = new Date(second_open),
    lotExists.close = new Date(close),
    lotExists.org_avaliation = org_avaliation,
    lotExists.initial_bid1 = initial_bid1.replace('.','').replace(',','.'),
    lotExists.initial_bid2 = initial_bid2.replace('.','').replace(',','.'),
    lotExists.is_active = `${is_active}` 

    await this.lotsRepository.save(lotExists);
    
    return lotExists;
  }
}

export default AdmUpdateLotService;