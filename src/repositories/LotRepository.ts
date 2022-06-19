
import dataSource from "../database";

import { Lot } from "../entities/Lot";

const LotRepository = dataSource.getRepository(Lot)

export { LotRepository };
