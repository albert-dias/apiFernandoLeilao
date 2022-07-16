import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Lot } from "./Lot";
import { User } from "./User";


@Entity('visibles_lot')
export class VisibleLot{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    lot_id: string;

    @JoinColumn({ name: "lot_id" })
    @ManyToOne(() => Lot)     
    lot: Lot;
                    
    @CreateDateColumn()
    created_at: Date;
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}