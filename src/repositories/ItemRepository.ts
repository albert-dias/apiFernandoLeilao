
import dataSource from "../database";

import { Item } from "../entities/Item";

const ItemRepository = dataSource.getRepository(Item)

export { ItemRepository };
