import { City } from '../entities/city/city-entity';

export interface AddressModel{
    id: number,
    street: string;
    city: City;
}