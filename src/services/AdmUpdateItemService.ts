import { Repository } from "typeorm";
import dataSource from "../database";
import { Item } from "../entities/Item";
import { Lot } from "../entities/Lot";
import { User } from "../entities/User";

interface IRequest {
  user_id: string;
  lot_id: string;
  subcategory_id: string;
  cod_item: string;
  avaliation: string;
  description: string;
  org_avaliation: string;
  initial_bid1: string;
  initial_bid2?: string;
  zipcode: string;
  street: string;
  number: string;
  complement: string;
  region: string;
  state: string;
  city: string;
  is_active: number;
  destaq: number;
  lat: string;
  lng: string;
  title: string;
  id: string;
}

class AdmUpdateItemService {
  private itemsRepository: Repository<Item>;
  private lotsRepository: Repository<Lot>;
  private usersRepository: Repository<User>;

  constructor() {
    this.itemsRepository = dataSource.getRepository(Item);
    this.lotsRepository = dataSource.getRepository(Lot);
    this.usersRepository = dataSource.getRepository(User);
  }
  public async execute({
    user_id,
    lot_id,
    cod_item,
    avaliation,
    description,
    org_avaliation,
    initial_bid1,
    initial_bid2,
    zipcode,
    street,
    number,
    complement,
    region,
    state,
    city,
    destaq,
    subcategory_id,
    lat,
    lng,
    title,
    id, 
    is_active
  }: IRequest): Promise<Item> {

    if (!user_id ||
      !lot_id ||
      !subcategory_id ||
      !cod_item ||
      !avaliation ||
      !description ||
      !initial_bid1 ||
      !zipcode ||
      !street ||
      !number ||
      !region ||
      !state ||
      !city ||
      !lat ||
      !lng ||
      !title ||
      !id) {
      throw new Error("Dados do item incompletos!")
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: user_id,
        is_adm: 1
      },
    });

    if (!user) {
      throw new Error("Usuário não é administrador!")
    }

    const lotExists = await this.lotsRepository.findOne({
      where: {
        id: lot_id
      }
    })

    if (!lotExists) {
      throw new Error("Lote não encontrado!")
    }

    const itemExists = await this.itemsRepository.findOneBy({id})

    if (!itemExists) {
      throw new Error("Item não encontrado!")
    }

      itemExists.lot_id = lot_id;
      itemExists.subcategory_id = subcategory_id;
      itemExists.cod_item = cod_item;
      itemExists.avaliation = avaliation;
      itemExists.description = description;
      itemExists.org_avaliation = org_avaliation;
      itemExists.initial_bid1 = initial_bid1;
      itemExists.initial_bid2 = initial_bid2;
      itemExists.zipcode = zipcode;
      itemExists.street = street;
      itemExists.number = number;
      itemExists.complement = complement;
      itemExists.region = region;
      itemExists.state = state;
      itemExists.city = city;
      itemExists.destaq = destaq;
      itemExists.is_active = `${is_active}`;
      itemExists.lat = lat;
      itemExists.lng = lng;
      itemExists.title = title;

    await this.itemsRepository.save(itemExists);

    return itemExists;
  }
}

export default AdmUpdateItemService;