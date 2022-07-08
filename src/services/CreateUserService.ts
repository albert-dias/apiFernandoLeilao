import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import dataSource from "../database";
import { User } from "../entities/User";

interface IRequest {
    name: string;
    document:string;
    identity:string;
    mail:string;
    phone:string;
    whatsapp:string;
    birth:string;
    job:string;
    marital:string;
    naturalness: string;
    nationality: string;
    fatherName:string;
    motherName:string;
    maritalName:string;
    maritalDocument:string;
    maritalIdentity  :string; 
    userName:string;
    pass:string;
    zipcode:string;
    street:string;
    number:string;
    complement:string;
    region:string;
    city:string;
    state:string;
}

class CreateUserService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = dataSource.getRepository(User);
    }
    public async execute({ 
        name, 
        document, 
        identity, 
        mail, 
        phone, 
        whatsapp, 
        birth, 
        job, 
        marital,
        naturalness,
        nationality,
        fatherName, 
        motherName, 
        maritalName, 
        maritalDocument, 
        maritalIdentity,
        userName, 
        pass, 
        zipcode, 
        street, 
        number, 
        complement, 
        region, 
        city, 
        state 
    }: IRequest): Promise<User> {
        
        if( !name || 
            !document || 
            !identity || 
            !mail || 
            !phone || 
            !whatsapp || 
            !birth || 
            !job || 
            !marital ||
            !naturalness ||
            !nationality ||
            !fatherName || 
            !motherName || 
            !userName || 
            !pass || 
            !zipcode || 
            !street || 
            !number || 
            !complement || 
            !region || 
            !city || 
            !state ){
            throw new Error("Dados incompletos!")
        }
        
        const userExists = await this.usersRepository.findOne({
            where: [
                {document},
                {mail}
            ]
        });

        if(userExists){
            throw new Error("Já existe um usuário cadastrado com esse documento ou e-mail")
        }

        const hashedPassword = await hash(pass, 8);

        const user = this.usersRepository.create({
            name, 
            document, 
            identity, 
            mail, 
            phone, 
            whatsapp, 
            birth, 
            profission: job, 
            marital,
            naturalness,
            nationality,
            father_name: fatherName, 
            mother_name: motherName, 
            marital_name: maritalName, 
            marital_document: maritalDocument, 
            marital_identity: maritalIdentity,
            username: userName, 
            password: hashedPassword, 
            zipcode, 
            street, 
            number, 
            complement, 
            region, 
            city, 
            state
        });

        await this.usersRepository.save(user);

        delete user.password;

        return user;
    }
}

export default CreateUserService;