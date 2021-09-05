import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Profile } from "../profile/profile-entity";

@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Profile, profile => profile.user)
    public profile!: Profile[];
}
