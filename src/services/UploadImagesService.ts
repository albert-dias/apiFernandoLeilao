import { Repository } from "typeorm";
import dataSource from "../database";
import { Image } from "../entities/Image";
import { Item } from "../entities/Item";

interface IRequest {
    images_url: string[];
    item_id: string;
    user_id: string;
  }
  

class CreateUploadImageService {
    private itemsRepository: Repository<Item>;
    private imagesRepository: Repository<Image>;

    constructor() {
        this.itemsRepository = dataSource.getRepository(Item);
        this.imagesRepository = dataSource.getRepository(Image);
    }
    public async execute({ images_url, item_id, user_id }: IRequest): Promise<Response> {
        
        if( images_url.length === 0 || !item_id ){
            throw new Error("Dados incompletos!")
        }

        const itemsExists = await this.itemsRepository.findOne({
            where: {
                id: item_id
            }
        });

        if(!itemsExists){
            throw new Error("Item não encontrado!")
        }


        await Promise.all(
            images_url.map( async (image) => {
                const img = this.imagesRepository.create({
                    item_id,
                    url: image
                })

                await this.imagesRepository.save(img)
            })
        );
        

        return;
    }
}

export default CreateUploadImageService;