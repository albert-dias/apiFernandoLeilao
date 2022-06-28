import { Repository } from "typeorm";
import dataSource from "../database";
import { Doc } from "../entities/Doc";
import { User } from "../entities/User";

interface IRequest {
    documents_url: string[];
    user_id: string;
  }
  

class CreateUploadService {
    private usersRepository: Repository<User>;
    private docsRepository: Repository<Doc>;

    constructor() {
        this.usersRepository = dataSource.getRepository(User);
        this.docsRepository = dataSource.getRepository(Doc);
    }
    public async execute({ documents_url, user_id }: IRequest): Promise<Response> {
        
        if( documents_url.length === 0 || !user_id ){
            throw new Error("Dados incompletos!")
        }

        console.log(documents_url.length )
        
        const userExists = await this.usersRepository.findOne({
            where: {
                id: user_id
            }
        });

        if(!userExists){
            throw new Error("Usuário não encontrado!")
        }


        await Promise.all(
            documents_url.map( async (document) => {
                const doc = this.docsRepository.create({
                    user_id,
                    type: "doc",
                    url: document
                })

                await this.docsRepository.save(doc)
            })
        );
        

        return;
    }
}

export default CreateUploadService;