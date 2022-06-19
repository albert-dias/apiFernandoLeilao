import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Image } from "./Image";
import { Lot } from "./Lot";
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

    @OneToMany(() => Image, (imageItem) => imageItem.id)
    @JoinTable({
      name: "images",
      joinColumns: [{ name: "image_id" }],
      inverseJoinColumns: [{ name: "item_id" }],
    })
    images: Image[];
                    
    @Column()       
    cod_item: string;
                    
    @Column()       
    avaliation: string;

    @Column()       
    description: string;

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