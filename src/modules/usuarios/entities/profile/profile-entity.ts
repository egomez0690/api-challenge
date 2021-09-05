import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../user/user-entity';
import { Address } from '../address/address-entity';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;
    
    @ManyToOne(() => User, user => user.profile)
    public user!: User;

    @ManyToOne(() => Address, address => address.profile)
    public address!: Address;
    
}
