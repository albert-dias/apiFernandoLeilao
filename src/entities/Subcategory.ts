import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";

@Entity('subcategories')
export class Subcategory{
    @PrimaryColumn()       
    id: string;

    @Column()       
    category_id: string;

    @JoinColumn({ name: "category_id" })
    @ManyToOne(() => Category)     
    category: Category;
                    
    @Column()       
    description: string;
  
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