
import dataSource from "../database";

import { Auction } from "../entities/Auction";

const AuctionRepository = dataSource.getRepository(Auction)

export { AuctionRepository };
