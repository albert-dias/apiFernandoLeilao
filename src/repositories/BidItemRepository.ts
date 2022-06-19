
import dataSource from "../database";

import { BidItem } from "../entities/BidItem";

const BidItemRepository = dataSource.getRepository(BidItem)

export { BidItemRepository };
