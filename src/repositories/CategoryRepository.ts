
import dataSource from "../database";

import { Category } from "../entities/Category";

const CategoryRepository = dataSource.getRepository(Category)

export { CategoryRepository };
