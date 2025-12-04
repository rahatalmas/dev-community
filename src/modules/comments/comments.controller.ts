import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { ReplyCommentDto } from './dto/reply-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  //constructor: commentService for business logic
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  findAll(@Param('id') id:string){
    return this.commentsService.findAll(id)
  }

  //for adding a new comment to a blog
  @Post('add')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  //for editing a comment
  @Patch('edit')
  update(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto);
  }

  //for removing a comment
  @Delete('remove')
  remove(@Body() removeCommentDto: RemoveCommentDto) {
    return this.commentsService.remove(removeCommentDto);
  }

  @Post('reply')
  reply(@Body() replyCommentDto: ReplyCommentDto){
    return this.commentsService.replyComment(replyCommentDto)
  }

  @Delete('reply/remove')
  removeReply(){
    
  }

}
