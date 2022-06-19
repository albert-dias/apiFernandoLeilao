import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Item } from "./Item";
import { User } from "./User";


@Entity('bids_item')
export class BidItem{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    item_id: string;

    @JoinColumn({ name: "item_id" })
    @ManyToOne(() => Item)     
    item: Item;

    @Column()       
    user_id: string;

    @JoinColumn({ name: "lot_id" })
    @ManyToOne(() => User)     
    user: User;
                    
    @Column()       
    value: string;
                    
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