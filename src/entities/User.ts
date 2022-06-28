import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
import { Doc } from "./Doc";

//   @JoinColumn({ name: "cup_id" })
//     @ManyToOne(() => Cup, { eager: true })
//     cup: Cup;
  
//     @Column()
//     cup_id: string;
  
//     @JoinColumn({ name: "user_id_champion" })
//     @ManyToOne(() => User)
//     champion: User;
  
//     @Column()
//     user_id_champion: string;
  
//     @JoinColumn({ name: "user_id_second" })
//     @ManyToOne(() => User)
//     second: User;
  
//     @OneToMany(
//       () => BedroomToQuestion,
//       (bedroomToQuestion) => bedroomToQuestion.id
//     )
//     @JoinTable({
//       name: "bedroom_has_question",
//       joinColumns: [{ name: "bedroom_id" }],
//       inverseJoinColumns: [{ name: "quetion_id" }],
//     })
//     questions: BedroomToQuestion[];
  
//     @OneToMany(() => BedroomToUser, (bedroomToUser) => bedroomToUser.id)
//     @JoinTable({
//       name: "bedroom_has_user",
//       joinColumns: [{ name: "bedroom_id" }],
//       inverseJoinColumns: [{ name: "user_id" }],
//     })
  
  
  @Entity("users")
  export class User {
    @PrimaryColumn()
    id: string;

    @OneToMany(() => Doc, doc=> doc.user)
    documents: Doc[];
    
    @Column()
    name: string;
                    
    @Column()                    
    is_active: number;
                    
    @Column()       
    is_adm: number;
                    
    @Column()      
    document: string;
                    
    @Column()       
    identity: string;
                    
    @Column()       
    mail: string;
                    
    @Column()       
    phone: string;
                    
    @Column()       
    whatsapp: string;
                    
    @Column()       
    birth: string;
                    
    @Column()       
    profission: string;
                    
    @Column()       
    marital: string;
                    
    @Column()       
    naturalness: string;
                    
    @Column()          
    nationality: string;
                    
    @Column()       
    father_name: string;
    
    @Column()
    mother_name: string;
                    
    @Column()                
    marital_name: string;
                    
    @Column()       
    marital_document: string;
                    
    @Column()       
    marital_identity: string;
                    
    @Column()       
    username: string;
                    
    @Column()       
    password: string;
                    
    @Column()       
    zipcode: string;
                    
    @Column()       
    street: string;
                    
    @Column()       
    number: string;
                    
    @Column()       
    complement: string;
                    
    @Column()       
    region: string;
                    
    @Column()       
    state: string;
                    
    @Column()       
    city: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
  }
  