import { Injectable } from '@nestjs/common';
import { CreateReplyCommentDto } from './dto/create-reply-comment.dto';
import { UpdateReplyCommentDto } from './dto/update-reply-comment.dto';
import { ReplyCommentsRepo } from './reply-comment.repo';

@Injectable()
export class ReplyCommentsService {

  constructor(private readonly replyCommentsRepo:ReplyCommentsRepo){}

  async create(createReplyCommentDto: CreateReplyCommentDto) {
    let res = await this.replyCommentsRepo.addReply(createReplyCommentDto)
    return res;
  }

  async findAll(parentId:string) {
    let res = await this.replyCommentsRepo.allReplies(parentId)
    return res;
  }


  async update(updateReplyCommentDto: UpdateReplyCommentDto) {
    let res = await this.replyCommentsRepo.updateReply(updateReplyCommentDto)
    return res
  }

  async remove(updateReplyCommentsDto: UpdateReplyCommentDto) {
    let res = await this.replyCommentsRepo.removeReply(updateReplyCommentsDto)
    return res;
  }
}
