import { Repository } from "typeorm";
import dataSource from "../database";
import { VisibleItem } from "../entities/VisibleItem";


interface IRequest {
  id: string;
}

interface IResposnse {
  id: string;
  quantity:number;
}

class ShowVisibleItemService {
  private visibleItemsRepository: Repository<VisibleItem>;

  constructor() {
    this.visibleItemsRepository = dataSource.getRepository(VisibleItem);
  }
  public async execute({ id }: IRequest): Promise<IResposnse> {

    console.log(id)

    if (!id) {
      throw new Error("Dados incompletos!")
    }

    const visible = await this.visibleItemsRepository.find({
      where: {
        item_id: id
      },
    });

    if(!visible){
      throw new Error("Usuário não existe!")
    }

    console.log("Entrei", id, visible.length)

    return {
      id,
      quantity: visible.length
    };
  }
}

export default ShowVisibleItemService;