import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/usuarios/entities/user/user-entity';
import { CreateUserDTO } from '../../DTOs/createUser.dto';
import {getManager} from "typeorm";
import { UserModel } from '../../interfaces/user.interfaces';
import { CityService } from '../city/city.service';
import { UserDTO } from '../../DTOs/user.dto';
import { AddressService } from '../address/address.service';
import { ProfileService } from '../profile/profile.service';
import { response } from 'express';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<UserModel>,
        private readonly cityService: CityService,
        private readonly addressService: AddressService,
        private readonly profileService: ProfileService
    ) {}

    async findUserByUsername(username: string): Promise<UserModel>{
        return await this.userRepository.findOne({ where: { username: username}});
    }

    async findUser(userDTO: UserDTO): Promise<UserModel> {        
        return await this.userRepository.findOne({ where: { username: userDTO.username, password: userDTO.password}});        
    }    

    async createUser(createUserDTO: CreateUserDTO){
                               
        const entityManager = getManager();        

        let existUser = true;
        let existAddress = true;
        
        const city = await this.cityService.findCityById(createUserDTO.cityId);

        //Verificación de user existente
        let user = await this.findUserByUsername(createUserDTO.username);        
        if(!user){
            existUser = false;
            const userToCreate = await entityManager.create(User, {
                username: createUserDTO.username,
                password: createUserDTO.password
            });                
            user = await entityManager.save(userToCreate);
        }                                
        //const rawData = await entityManager.query('SELECT * FROM usuarios_db.city WHERE id = ?',[createUserDTO.cityId]);        
        //console.log("rawData:" , rawData);
        
        const addressToInsert = {
            street : createUserDTO.address,
            city: city
        };

        //Verificación de address existente
        let address = await this.addressService.findAddress(addressToInsert);
        if (!address){
            existAddress = false;
            address = await this.addressService.createAddress(addressToInsert);
        }

        if (existUser && existAddress){
            //Verificación de perfil existente
            let profile = this.profileService.findProfileByUserAndAddress(user.id,address.id)
            if (profile){
                const result = {
                    code: 'ERROR',
                    message: 'The profile already exists for the user ' + user.username
                }
                throw result;
            }
        }
        const profileToCreate = {
            name: createUserDTO.name,
            user: user,
            address: address
        }

        //Creacion de perfil
        await this.profileService.createProfile(profileToCreate);
        
        return true;
    }
}
