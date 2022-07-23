import { Repository } from "typeorm";
import dataSource from "../database";
import { Auction } from "../entities/Auction";
import { User } from "../entities/User";

interface IRequest {
  id: string;
  user_id: string;
  cod_leilao: string;
  type_auction: string;
  url_edital: string;
  data_realizacao: string;
  description: string;
  is_active: number;
}

class AdmUpdateAuctionService {
  private auctionsRepository: Repository<Auction>;
  private usersRepository: Repository<User>;

  constructor() {
    this.auctionsRepository = dataSource.getRepository(Auction);
    this.usersRepository = dataSource.getRepository(User);
  }
  public async execute({ 
    id,
    user_id, 
    cod_leilao,
    type_auction,
    url_edital,
    data_realizacao,
    description,
    is_active 
  }: IRequest): Promise<Auction> {

    if (
      !user_id ||
      !id || 
      !cod_leilao || 
      !type_auction || 
      !url_edital ||
      !data_realizacao ||
      !description ||
      !is_active ) {
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

    const auctionExists = await this.auctionsRepository.findOneBy({id});

    if(!auctionExists){
      throw new Error("Leilão não existe!")
    }

      auctionExists.cod_leilao = cod_leilao,
      auctionExists.type_auction = type_auction,
      auctionExists.url_edital = url_edital,
      auctionExists.data_realizacao = data_realizacao,
      auctionExists.description = description,
      auctionExists.is_active = is_active

    await this.auctionsRepository.save(auctionExists);
    
    return auctionExists;
  }
}

export default AdmUpdateAuctionService;