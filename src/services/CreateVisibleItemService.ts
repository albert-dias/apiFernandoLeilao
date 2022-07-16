
import { Repository } from "typeorm";
import dataSource from "../database";
import { VisibleItem } from "../entities/VisibleItem";

interface IRequest {
  item_id: string;
}

class CreateVisibleItemService {
  private visibleItemRepository: Repository<VisibleItem>;

  constructor() {
    this.visibleItemRepository = dataSource.getRepository(VisibleItem);
  }
  public async execute({ 
    item_id,
  }: IRequest): Promise<VisibleItem> {

    console.log("Entrei no Service")

    if ( !item_id ) {
      throw new Error("Dados incompletos!")
    }

    const visible =  this.visibleItemRepository.create({
      item_id,
    });

    console.log(visible)

    await this.visibleItemRepository.save(visible);
    
    return visible;
  }
}

export default CreateVisibleItemService;
