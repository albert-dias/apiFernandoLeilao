import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import dataSource from "../database";
import { NewsLetter } from "../entities/NewsLetter";
import { User } from "../entities/User";

interface IRequest {
    mail:string;
}

class AssignNewsLetterService {
    private newsLettersRepository: Repository<NewsLetter>;

    constructor() {
        this.newsLettersRepository = dataSource.getRepository(NewsLetter);
    }
    public async execute({ 
        mail, 
    }: IRequest): Promise<NewsLetter> {
        
        if( !mail ){
            throw new Error("Dados incompletos!")
        }
        
        const newsLetterExists = await this.newsLettersRepository.findOne({
            where: 
                {email: mail}
            
        });

        if(newsLetterExists){
            throw new Error("E-mail ja cadastrado em nossa base")
        }

        const newsLetter = this.newsLettersRepository.create({
            email: mail, 
        });

        await this.newsLettersRepository.save(newsLetter);


        return newsLetter;
    }
}

export default AssignNewsLetterService;