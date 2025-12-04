import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Db } from "mongodb";
import { MongoIdValidator } from "../../common/utils/mongo.util";
import { ReplyCommentDto } from "../comments/dto/reply-comment.dto";
import { UpdateReplyCommentDto } from "./dto/update-reply-comment.dto";
import { CreateReplyCommentDto } from "./dto/create-reply-comment.dto";

@Injectable()
export class ReplyCommentsRepo{
    collection:string = "commentsReply"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}

    async allReplies(parentId:string){
        let comments = await this.db.collection(this.collection).find({parentId:MongoIdValidator(parentId)}).toArray()
        return comments
    }

    //logic and query for adding comments
    async addReply(comment: CreateReplyCommentDto){
        const session = this.db.client.startSession()
        session.startTransaction()
        try{
            const checkUserId = await this.db.collection("users").findOne({_id:MongoIdValidator(comment.userId)})
            if(checkUserId == null){
                throw new BadRequestException("user id doesn't exist")
            }
            const res = await this.db.collection("comments").updateOne(
                {
                    _id: MongoIdValidator(comment.parentId)
                },
                {
                    $inc:{replyCount:1}
                },
                {
                    upsert:true,
                    session
                }
            )
            if(res.matchedCount==0){
                throw new BadRequestException("invalid references")
            }
            const res2 = await this.db.collection(this.collection).insertOne(comment,{session})
            await session.commitTransaction()
            return res2
        }catch(err){
            await session.abortTransaction()
            console.log(err)
            throw err
        }finally{
            await session.endSession()
        }
    }
    
    //logics and query for removing comments
    async removeReply(updateReplyComment:UpdateReplyCommentDto) {
        const session = this.db.client.startSession()
        session.startTransaction()
        try{
            const res = await this.db.collection(this.collection).deleteOne(
                {
                    $and:[
                        { _id: MongoIdValidator(updateReplyComment.replyCommentId)},{userId:updateReplyComment.userId}
                    ]
                },   
            )
            if(res.deletedCount>0){
                const res2 = await this.db.collection("comments").updateOne(
                    {_id: MongoIdValidator(updateReplyComment.parentId)},
                    {$inc:{replyCount:-1}}
                )
            }else{
                throw new NotFoundException("invalid references")
            }
            await session.commitTransaction()
        }catch(err){
            await session.abortTransaction()
            throw err
        }finally{
            await session.endSession()
        }
    }

    async updateReply(updateReply: UpdateReplyCommentDto){
        let res = await this.db.collection(this.collection).updateOne(
            {
                $and:[
                    {_id:MongoIdValidator(updateReply.replyCommentId)},
                    {userId:updateReply.userId}
                ]
            },
            {
                $set: {comment:updateReply.comment}  
            }
        )
        if(res.matchedCount==0){
            throw new BadRequestException("invalid references")
        }
        return res
    }
}