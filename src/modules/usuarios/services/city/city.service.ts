import { City } from '../../entities/city/city-entity';
import { CityModel } from 'src/modules/usuarios/interfaces/city.interface';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
    
    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<CityModel>        
    ) {}

    async findCityById(cityId: number) : Promise<CityModel>{
        return await this.cityRepository.findOne(cityId);
    }
}
