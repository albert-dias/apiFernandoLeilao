import { Repository } from "typeorm";
import dataSource from "../database";
import { Subcategory } from "../entities/Subcategory";

class SubcategoryListService {
  private subcategoriesRepository: Repository<Subcategory>;

  constructor() {
    this.subcategoriesRepository = dataSource.getRepository(Subcategory);
  }
  public async execute(): Promise<Subcategory[]> {

    const subcategories = await this.subcategoriesRepository.find();

    return subcategories;
  }
}

export default SubcategoryListService;