import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";


@Entity('docs')
export class Doc{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    user_id: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)     
    user: User;
                    
    @Column()       
    type: string;
                    
    @Column()       
    url: string;              
  
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