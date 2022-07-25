
import dataSource from "../database";

import { NewsLetter } from "../entities/NewsLetter";

const NewsLetterRepository = dataSource.getRepository(NewsLetter)

export { NewsLetterRepository };
