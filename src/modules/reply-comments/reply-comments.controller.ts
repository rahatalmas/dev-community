import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReplyCommentsService } from './reply-comments.service';
import { CreateReplyCommentDto } from './dto/create-reply-comment.dto';
import { UpdateReplyCommentDto } from './dto/update-reply-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments reply')
@Controller('comments-reply')
export class ReplyCommentsController {
  constructor(private readonly replyCommentsService: ReplyCommentsService) {}

  @Post('add')
  create(@Body() createReplyCommentDto: CreateReplyCommentDto) {
    return this.replyCommentsService.create(createReplyCommentDto);
  }

  @Get(':parentId')
  findAll(@Param('ParentId') parentId: string) {
    return this.replyCommentsService.findAll(parentId)
  }

  @Patch('update')
  update(@Body() updateReplyCommentDto: UpdateReplyCommentDto) {
    return this.replyCommentsService.update(updateReplyCommentDto);
  }

  @Delete('remove')
  remove(@Body() updateReplyCommentDto: UpdateReplyCommentDto) {
    return this.replyCommentsService.remove(updateReplyCommentDto);
  }
}
