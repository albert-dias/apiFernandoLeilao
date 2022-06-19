
import dataSource from "../database";

import { EnableInLot } from "../entities/EnableInLot";

const EnableInLotRepository = dataSource.getRepository(EnableInLot)

export { EnableInLotRepository };
