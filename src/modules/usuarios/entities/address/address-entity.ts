import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { City } from '../city/city-entity';
import { Profile } from '../profile/profile-entity';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @ManyToOne(() => City, city => city.addresses)
    city: City;

    @OneToMany(() => Profile, profile => profile.address)
    public profile!: Profile[];
}
