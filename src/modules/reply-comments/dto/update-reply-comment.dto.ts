import { PartialType } from '@nestjs/mapped-types';
import { CreateReplyCommentDto } from './create-reply-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReplyCommentDto extends CreateReplyCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    replyCommentId:string
}