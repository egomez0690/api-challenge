import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { User } from '../usuarios/entities/user/user-entity';
import { City } from '../usuarios/entities/city/city-entity';
import { Address } from '../usuarios/entities/address/address-entity';
import { Profile } from '../usuarios/entities/profile/profile-entity';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'usuarios_db',
        entities: [City, Address, User, Profile],
        synchronize: true,
      }),
      UsuariosModule      
    ],
  })
export class DatabaseModule {}
