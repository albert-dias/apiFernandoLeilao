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
  public async execute({ user_id }: IRequest): Promise<User[]> {

    if (!user_id) {
      throw new Error("Dados incompletos!")
    }

    const users = await this.usersRepository.find();

    if(!users){
      throw new Error("Usuário não existe!")
    }

    users.map(user => {
      delete user.password;
    })

    return users;
  }
}

export default AdmLisUsersService;