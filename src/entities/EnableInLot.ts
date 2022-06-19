import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Lot } from "./Lot";
import { User } from "./User";


@Entity('enable_user_lot')
export class EnableInLot{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    lot_id: string;

    @JoinColumn({ name: "lot_id" })
    @ManyToOne(() => Lot)     
    lot: Lot;

    @Column()       
    user_id: string;

    @JoinColumn({ name: "lot_id" })
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