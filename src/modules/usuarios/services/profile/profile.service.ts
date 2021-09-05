import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../entities/profile/profile-entity';
import { ProfileModel } from '../../interfaces/profile.interface';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<ProfileModel>,        
    ) {}

    async findProfileByUserAndAddress(userId: number, addressId: number): Promise<ProfileModel>{
        return await this.profileRepository.findOne(
            { 
                where: {
                    user : { id: userId} ,
                    address: {id: addressId} 
                }
            }
        );
    }

    async getProfileById(userID: number){       
        const profile = await this.profileRepository.findOne( 
            { 
                where: {
                    user : { id: userID}  
                },
                relations: ["user","address", "address.city"]
            });  
        
        const result = {
            id: profile.id,
            name: profile.name,
            address: {
                street: profile.address.street,
                city: profile.address.city.name
            }
        }    
        return result;
    }
    
    async createProfile(profileModel): Promise<ProfileModel>{        
        return await this.profileRepository.save(profileModel);        
    }        
}
