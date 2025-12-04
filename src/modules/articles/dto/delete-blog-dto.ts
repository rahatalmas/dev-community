import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteBlogDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    blogId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    authorId:string
}