
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { City } from "../entities/city/city-entity";

@ValidatorConstraint({ name: 'CityExists', async: true })
@Injectable()
export class CityExistsRule implements ValidatorConstraintInterface {
     
    constructor() {}

    async validate(cityId: number) {
        const entityManager = getManager();           
        console.log(cityId);
        const city = await entityManager.findOne(City, cityId);
        if (!city)
            return false;
        return true;    
    }

    defaultMessage(args: ValidationArguments) {
    return `CityId ${args.value} not found`;
  }
}