import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LikeDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contentId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contentType:string
}