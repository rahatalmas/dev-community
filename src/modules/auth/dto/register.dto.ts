import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsNotEmpty, IsString} from 'class-validator';

//dto for registration
//used in register() controller
export class RegistrationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullname: string

    @ApiProperty()
    @IsNotEmpty()
    username: string
    
    @ApiProperty()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
}