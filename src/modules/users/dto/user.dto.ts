import { ApiProperty, PartialType } from '@nestjs/swagger';
import {IsArray,IsString} from 'class-validator';

//default user dto for updating users information.
export class UserDto {
    @ApiProperty()
    @IsString()
    fullname: string
    
    @ApiProperty()
    @IsString()
    username: string
    
    @ApiProperty()
    @IsString()
    bio: string

    @ApiProperty()
    @IsString()
    dpUri:string
    
    @ApiProperty()
    @IsArray()
    @IsString({each:true})
    skills:string[]

    @ApiProperty()
    @IsArray()
    @IsString({each:true})
    experience:string[]
}

export class UpdateUserDto extends PartialType(UserDto){}