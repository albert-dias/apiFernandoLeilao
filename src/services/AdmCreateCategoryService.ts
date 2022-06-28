import { Repository } from "typeorm";
import dataSource from "../database";
import { Category } from "../entities/Category";
import { User } from "../entities/User";

interface IRequest {
  user_id: string;
  description: string;
}

class AdmCreateCategoryService {
  private categoriesRepository: Repository<Category>;
  private usersRepository: Repository<User>;

  constructor() {
    this.categoriesRepository = dataSource.getRepository(Category);
    this.usersRepository = dataSource.getRepository(User);
  }
  public async execute({ 
    user_id, 
    description,
  }: IRequest): Promise<Category> {

    if (!user_id || !description ) {
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

    const category =  this.categoriesRepository.create({
      description,
    });

    await this.categoriesRepository.save(category);
    
    return category;
  }
}

export default AdmCreateCategoryService;