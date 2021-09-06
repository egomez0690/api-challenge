import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../entities/address/address-entity';
import { AddressModel } from '../../interfaces/address.interface';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<AddressModel>,        
    ) {}

    async findAddress(address) : Promise<AddressModel>{
        return await this.addressRepository.findOne({ 
            where: {
                city : { id: address.city.id} ,
                street: {id: address.street} 
            }
        });
    }    

    async createAddress(address) : Promise<AddressModel> {        
        return await this.addressRepository.save(address);
    }
}
