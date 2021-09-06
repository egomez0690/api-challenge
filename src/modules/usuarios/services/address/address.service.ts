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
        return await this.addressRepository.findOne(address);
    }    

    async createAddress(address) : Promise<AddressModel> {        
        return await this.addressRepository.save(address);
    }
}
