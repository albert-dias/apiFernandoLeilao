import { Repository } from "typeorm";
import dataSource from "../database";
import { Category } from "../entities/Category";

class CategoryListService {
  private categoriesRepository: Repository<Category>;

  constructor() {
    this.categoriesRepository = dataSource.getRepository(Category);
  }
  public async execute(): Promise<Category[]> {

    const categories = await this.categoriesRepository.find({
      relations:["subcategories"]
    });

    return categories;
  }
}

export default CategoryListService;