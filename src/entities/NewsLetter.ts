import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";


@Entity('newsletter')
export class NewsLetter{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    email: string;
               
    @Column()       
    is_active: number;              
  
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