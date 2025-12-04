import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { ApiProperty } from '@nestjs/swagger';

//for updating existing blog data
export class UpdateBlogDto extends PartialType(CreateBlogDto) {
    @ApiProperty()
    authorId: string

    @ApiProperty()
    blogId:string
}
