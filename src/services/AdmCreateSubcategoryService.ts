import { Repository } from "typeorm";
import dataSource from "../database";
import { Subcategory } from "../entities/Subcategory";
import { User } from "../entities/User";

interface IRequest {
  user_id: string;
  category_id: string;
  description: string;
}

class AdmCreateSubcategoryService {
  private subcategoriesRepository: Repository<Subcategory>;
  private usersRepository: Repository<User>;

  constructor() {
    this.subcategoriesRepository = dataSource.getRepository(Subcategory);
    this.usersRepository = dataSource.getRepository(User);
  }
  public async execute({ 
    user_id,
    category_id,
    description,
  }: IRequest): Promise<Subcategory> {

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

    const subcategory =  this.subcategoriesRepository.create({
      description,
      category_id
    });

    await this.subcategoriesRepository.save(subcategory);
    
    return subcategory;
  }
}

export default AdmCreateSubcategoryService;