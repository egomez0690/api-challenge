import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Address } from '../address/address-entity';

@Entity()
export class City
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Address, address => address.city)
    addresses: Address[];
}
