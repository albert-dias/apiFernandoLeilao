
import dataSource from "../database";

import { BidLot } from "../entities/BidLot";

const BidLotRepository = dataSource.getRepository(BidLot)

export { BidLotRepository };
