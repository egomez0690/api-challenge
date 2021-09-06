import { IsNotEmpty } from "class-validator";

export class UserDTO{
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly password: string;
}