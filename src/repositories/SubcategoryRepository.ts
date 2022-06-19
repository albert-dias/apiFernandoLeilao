
import dataSource from "../database";

import { Subcategory } from "../entities/Subcategory";

const SubcategoryRepository = dataSource.getRepository(Subcategory)

export { SubcategoryRepository };
