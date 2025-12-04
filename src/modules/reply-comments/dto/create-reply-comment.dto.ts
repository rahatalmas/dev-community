import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateReplyCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId:string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    parentId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    comment:string
}
