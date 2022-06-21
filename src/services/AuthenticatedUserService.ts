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

    const user = await usersRepository.findOne({ where: { mail } });

    if (!user) {
      throw new Error("Incorrect email/password combination");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect email/password combination");
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