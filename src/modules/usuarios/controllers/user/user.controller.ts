import { Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { UserService} from 'src/modules/usuarios/services/user/user.service';
import { UserDTO } from 'src/modules/usuarios/DTOs/user.dto';
import { CreateUserDTO } from '../../DTOs/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Headers } from '@nestjs/common';
import { ProfileService } from '../../services/profile/profile.service';

@Controller('user')
export class UserController {
    constructor(
        private userService : UserService,
        private profileService: ProfileService,
        private jwtService : JwtService
    ){}


    @Post('/create')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO){

        try {
            const createdUser = await this.userService.createUser(createUserDTO)
            return res.status(HttpStatus.CREATED).json({
                message: "Usuario creado correctamente"
                //No muestro información del user en esta instancia
            })
            ;
        } catch (error) {
            if(error.code =="ERROR")
                return res.status(HttpStatus.OK).json({
                    message: error.message
                })
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error interno al crear el usuario. MESSAGE: ' + error
            })
        }       
    }

    @Post('/login')
    async login(@Res() res, @Body() userDTO : UserDTO){        
        //Validar tmb contraseña
        const user = await this.userService.findUser(userDTO);
        if(!user){
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "No se encontró un usuario con esas credenciales"
            }) ;
        }
        const jwt = await this.jwtService.signAsync({id: user.id});
        res.status(HttpStatus.OK).json({
            token: jwt
        }) ;    
        
    }

    @Get('/profile')
    async getUsers(@Headers() headers) {
        
        const token = headers.authorization;

        if (!token){
            throw new UnauthorizedException();
        }

        let data;
        try {
            data = await this.jwtService.verifyAsync(token);
        }            
        catch(e){
            throw new UnauthorizedException('Token inválido');
        } 
                
        const userId = data['id'];            
        const profile = await this.profileService.getProfileById(userId);
        
        return profile;
    }
}
