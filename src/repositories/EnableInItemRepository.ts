
import dataSource from "../database";

import { EnableInItem } from "../entities/EnableInItem";

const EnableInItemRepository = dataSource.getRepository(EnableInItem)

export { EnableInItemRepository };
