import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

//dto from updating existing skill or experience
//qtype is the query type:(supports only two type: 1. skills, 2. experience)
//uId is the user id
//key = existing value
//value = new value to set
//used in updateSkillOrExperience controller
export class UserSkillNExpUpdateDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    uId: string 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    qType: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    key: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    value: string
}