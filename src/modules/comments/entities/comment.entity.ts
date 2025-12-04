import { ObjectId } from "mongodb";
import { MetaDataDto } from "../../../common/meta-dat.dto";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { ReplyCommentDto } from "../dto/reply-comment.dto";

export class CommentEntity extends MetaDataDto{
    blogId:string
    userId:string 
    comment:string
    likesCount:number
    replyTo:string

    constructor(data: CreateCommentDto | ReplyCommentDto){
        super()
        if("blogId" in data){
           this.blogId = data.blogId        
        }
        this.userId = data.userId
        this.comment = data.comment
        this.likesCount = 0
        if("replyTo" in data){
            this.replyTo = data.replyTo
        }
    }
}    