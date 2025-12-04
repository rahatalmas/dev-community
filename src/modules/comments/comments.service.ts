import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.resitory';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { ResponseInterface } from '../../common/interface/response.interface';
import { ReplyCommentDto } from './dto/reply-comment.dto';

@Injectable()
export class CommentsService {
  //commentRepo is for database queries
  constructor(private readonly commentRepo: CommentRepository){}

  async findAll(blogId:string){
    let res = await this.commentRepo.allComments(blogId)
    return res
  }

  //adds a new comment to a post
  async create(createCommentDto: CreateCommentDto) {
    let comment = new CommentEntity(createCommentDto)
    let res = await this.commentRepo.addComment(comment);
    return new ResponseInterface({message:"comment added",data:res})
  }
  
  //updates a comment
  async update(updateCommentDto: UpdateCommentDto) {
      let res = await this.commentRepo.updateComment(updateCommentDto)
      return new ResponseInterface({message:"comment updated",data:res})
  }

  //removes a comment
  async remove(removeCommentDto: RemoveCommentDto) {
    let res = await this.commentRepo.removeComment(removeCommentDto.blogId,removeCommentDto.userId,removeCommentDto.commentId);
    return new ResponseInterface({message:"comment deleted",data:res})
  }

  async replyComment(replyCommentDto: ReplyCommentDto){
      let comment = new CommentEntity(replyCommentDto)
      let res = await this.commentRepo.commentReply(comment)
      console.log("comment reply ",res)
      return res
  }

  async updateReplyComment(){
      
  }

}
