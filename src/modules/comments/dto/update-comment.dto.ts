import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

//dto for updating comments
//used in update() controller
export class UpdateCommentDto extends PickType(CreateCommentDto,["userId","comment"]) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    commentId:string
}
