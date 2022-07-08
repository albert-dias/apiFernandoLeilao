import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Item } from "./Item";
import { Lot } from "./Lot";
import { User } from "./User";


@Entity('enable_user_item')
export class EnableInItem{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    item_id: string;

    @JoinColumn({ name: "item_id" })
    @ManyToOne(() => Item)     
    item: Item;

    @Column()       
    user_id: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)     
    user: User;
                    
    @Column()       
    status: string;
                    
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