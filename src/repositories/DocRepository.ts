
import dataSource from "../database";

import { Doc } from "../entities/Doc";

const DocRepository = dataSource.getRepository(Doc)

export { DocRepository };
