import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { BidItem } from "./BidItem";
import { Image } from "./Image";
import { Lot } from "./Lot";
import { Subcategory } from "./Subcategory";
import { User } from "./User";


@Entity('items')
export class Item{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    lot_id: string;

    @JoinColumn({ name: "lot_id" })
    @ManyToOne(() => Lot)     
    lot: Lot;

    @Column()       
    subcategory_id: string;

    @JoinColumn({ name: "subcategory_id" })
    @ManyToOne(() => Subcategory)     
    subcategory: Subcategory;

    @OneToMany(() => Image, (imageItem) => imageItem.item)
    images: Image[];
                    
    @Column()       
    cod_item: string;
                    
    @Column()       
    avaliation: string;

    @Column()       
    destaq: number;

    @Column()       
    description: string;

    @Column()       
    org_avaliation: string;
                                     
    @Column()       
    initial_bid1: string;

    @Column()       
    initial_bid2?: string;

    @Column()       
    win_bid_id: string;

    @JoinColumn({ name: "win_bid_id" })
    @ManyToOne(() => BidItem)     
    win_bid: BidItem;

    @Column()       
    close: Date;
    
    @Column()       
    user_win_id: string;

    @JoinColumn({ name: "user_win_id" })
    @ManyToOne(() => User)     
    user_win: User;

    @Column()       
    is_active: string;

    @Column()
    zipcode: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    complement: string;

    @Column()
    region: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    lat: string;

    @Column()
    lng: string;

    @Column()
    title: string;

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