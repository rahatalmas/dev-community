import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

//dto for removing any skill or experience.
//used in removeSkill and removeExperience controller for getting body data
export class UserSkillNExpRemoveDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    uId: string 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    key: string
}