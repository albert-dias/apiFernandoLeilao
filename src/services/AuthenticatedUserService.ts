import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../config/auth";
import dataSource from "../database";
import { User } from "../entities/User";

interface IRequest {
  mail: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ mail, password }: IRequest): Promise<IResponse> {
    const usersRepository = dataSource.getRepository(User);

    const user = await usersRepository.findOne({ where: { mail} });

    if (!user) {
      throw new Error("Combinação email/senha incorretos!");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Combinação email/senha incorretos!");
    }

    if(user.is_active === 0){
      throw new Error("Conta inativa, aguarde a ativação!");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ name: user.name, email: user.mail }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;