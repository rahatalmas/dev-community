import { ApiProperty, ApiTags } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsArray, Length, min } from "class-validator"

//default blog dto
export class CreateBlogDto{
    @ApiProperty({description:'blog title'})
    @IsNotEmpty()
    @IsString()
    title: string 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    authorId: string

    @ApiProperty()
    @IsString()
    status: string 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(25)
    content: string
    
    @ApiProperty()
    @IsArray()
    @IsString({each:true})
    tags: string[]
}