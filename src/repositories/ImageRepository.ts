
import dataSource from "../database";

import { Image } from "../entities/Image";

const ImageRepository = dataSource.getRepository(Image)

export { ImageRepository };
