import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsOptional,IsString } from "class-validator";

//default dto for comments
export class CreateCommentDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    blogId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string

    @ApiProperty()
    @IsString()
    comment:string
}
