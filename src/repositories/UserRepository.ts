
import dataSource from "../database";

import { User } from "../entities/User";

const UserRepository = dataSource.getRepository(User)

export { UserRepository };
