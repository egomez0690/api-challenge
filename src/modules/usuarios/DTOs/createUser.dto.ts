import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { CityExistsRule } from '../validators/city-exist-validator';

export class CreateUserDTO{
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly address: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Validate(CityExistsRule) //Custom validation
    readonly cityId: number;
}