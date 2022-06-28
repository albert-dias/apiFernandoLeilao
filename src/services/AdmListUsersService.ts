import { Repository } from "typeorm";
import dataSource from "../database";
import { User } from "../entities/User";

interface IRequest {
  user_id: string;
}

class AdmLisUsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = dataSource.getRepository(User);
  }
  public async execute({ user_id }: IRequest): Promise<User> {

    if (!user_id) {
      throw new Error("Dados incompletos!")
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: user_id
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

export default AdmLisUsersService;