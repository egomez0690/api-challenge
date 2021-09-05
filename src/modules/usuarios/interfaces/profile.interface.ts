import { User } from '../entities/user/user-entity';
import { Address } from '../entities/address/address-entity';

export interface ProfileModel{
    id: number,
    name: string,
    user: User,
    address: Address
}