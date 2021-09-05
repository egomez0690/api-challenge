import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user-entity';
import { UserController} from 'src/modules/usuarios/controllers/user/user.controller'
import { UserService } from './services/user/user.service';
import { City } from './entities/city/city-entity';
import { Address } from './entities/address/address-entity';
import { Profile } from './entities/profile/profile-entity';
import { AddressService } from './services/address/address.service';
import { JwtModule } from '@nestjs/jwt';
import { ProfileService } from './services/profile/profile.service';
import { CityService } from './services/city/city.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([City, Address, User, Profile]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '120s' },
          })
    ],
    controllers: [
		UserController
	],
	providers: [
        UserService,
        AddressService,
        ProfileService,
        CityService
    ]
})
export class UsuariosModule {}
