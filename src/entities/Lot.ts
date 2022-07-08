import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Auction } from "./Auction";
import { Item } from "./Item";
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

    @OneToMany(() => Item, item=> item.lot)
    items: Item[];
                    
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
    initial_bid1: string;

    @Column()       
    initial_bid2?: string;

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