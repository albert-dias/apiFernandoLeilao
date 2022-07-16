import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Item } from "./Item";
import { User } from "./User";


@Entity('visibles_item')
export class VisibleItem{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    item_id: string;

    @JoinColumn({ name: "item_id" })
    @ManyToOne(() => Item)     
    item: Item;
  
    @CreateDateColumn()
    created_at: Date;
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}