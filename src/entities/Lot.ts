import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Auction } from "./Auction";
import { User } from "./User";


@Entity('lots')
export class Lot{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    auction_id: string;

    @JoinColumn({ name: "auction_id" })
    @ManyToOne(() => Auction)     
    auction: Auction;
                    
    @Column()       
    cod_lot: string;
                    
    @Column()       
    description: string;
                    
    @Column()       
    avaliation: string;
                    
    @Column()       
    first_open: Date;
                    
    @Column()       
    second_open: Date;

    @Column()       
    close: Date;

    @Column()       
    org_avaliation: string;

    @Column()       
    inital_bid: string;

    @Column()       
    win_bid: string;

    @Column()       
    user_win_id: string;

    @JoinColumn({ name: "user_win_id" })
    @ManyToOne(() => User)     
    user_win: User;

    @Column()       
    is_active: string;
  
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