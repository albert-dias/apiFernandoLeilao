import { Repository } from "typeorm";
import dataSource from "../database";
import { User } from "../entities/User";

interface IRequest {
  user_id: string;
  id: string;
}

class AdmShowUserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = dataSource.getRepository(User);
  }
  public async execute({ id }: IRequest): Promise<User> {

    if (!id) {
      throw new Error("Dados incompletos!")
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: id
      },
      relations:['documents']
    });

    if(!user){
      throw new Error("Usuário não existe!")
    }

    delete user.password;

    return user;
  }
}

export default AdmShowUserService;