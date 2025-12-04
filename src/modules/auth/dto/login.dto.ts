import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

//dto for login
//used in login() controller
export class LoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
}