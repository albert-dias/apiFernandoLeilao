import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Item } from "./Item";


@Entity('images')
export class Image{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    item_id: string;

    @JoinColumn({ name: "item_id" })
    @ManyToOne(() => Item)     
    item: Item;
                    
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