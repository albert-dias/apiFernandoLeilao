import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity('auctions')
export class Auction{
    @PrimaryColumn()       
    id: string;
                    
    @Column()       
    cod_leilao: string;
                    
    @Column()       
    type_auction: string;
                    
    @Column()       
    url_edital: string;
                    
    @Column()       
    data_realizacao: string;
                    
    @Column()       
    description: string;
                    
    @Column()       
    is_active: number;
  
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