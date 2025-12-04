import { PickType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//remove comment dto
//used in remove() controller
export class RemoveCommentDto extends PickType(CreateCommentDto,["blogId","userId"]) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    commentId:string
}