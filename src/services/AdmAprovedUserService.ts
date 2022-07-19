import { Repository } from "typeorm";
import dataSource from "../database";
import { EnableInItem } from "../entities/EnableInItem";
import { EnableInLot } from "../entities/EnableInLot";
import { User } from "../entities/User";


interface IRequest {
  user_id: string;
  id: string;
  status: number 
}



class AdmAprovedUserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }
  public async execute({ user_id, id, status }: IRequest): Promise<User> {

    if (!user_id || !id || !status ) {
      throw new Error("Dados incompletos na requisição");
    }


    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if(!user){
      throw new Error ("Usuário não existe!");
    }

    user.is_active = status;

    await this.userRepository.save(user);

    return user
  }
}

export default AdmAprovedUserService;