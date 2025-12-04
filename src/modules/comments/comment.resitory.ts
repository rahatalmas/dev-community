import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Db, ObjectId } from "mongodb";
import { MongoIdValidator } from "../../common/utils/mongo.util";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentEntity } from "./entities/comment.entity";

@Injectable()
export class CommentRepository{
    commentCollection = "comments"
    blogCollection = "blogs"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}

    async allComments(blogId:string){
        //let comments = await this.db.collection(this.commentCollection).find({blogId:blogId}).toArray()
        let comments = await this.db.collection(this.commentCollection).aggregate([
                { $match: { blogId: blogId }},
                {
                    $lookup: {
                    from: "users",
                    let: { authorId: "$userId" },
                    pipeline: [
                        {
                        $match: {
                            $expr: {
                            $eq: [
                                "$_id",
                                {
                                $cond: [
                                    { $eq: [{ $type: "$$authorId" }, "string"] },
                                    { $toObjectId: "$$authorId" },
                                    "$$authorId"
                                ]
                                }
                            ]
                            }
                        }
                        },
                        { $project: { fullname: 1, username: 1, dpUri: 1 } }
                    ],
                    as: "user"
                    }
                },
            
            
        ]).toArray()
        console.log(comments)
        return comments
    }

    //logic and query for adding comments
    async addComment(comment: CommentEntity){
        let data = comment.cleanUndefined(comment)
        const session = this.db.client.startSession()
        session.startTransaction()
        try{
            const checkUserId = await this.db.collection("users").findOne({_id:MongoIdValidator(comment.userId)})
            if(checkUserId == null){
                throw new BadRequestException("user id doesn't exist")
            }
            const res = await this.db.collection(this.commentCollection).insertOne(data,{session})
            const res2 = await this.db.collection(this.blogCollection).updateOne(
                {
                    _id: MongoIdValidator(comment.blogId)
                },
                {
                    $inc:{commentsCount:1}
                },
                {
                    upsert:true,
                    session
                }
            )
            await session.commitTransaction()
            return res
        }catch(err){
            await session.abortTransaction()
            console.log(err)
            throw err
        }finally{
            await session.endSession()
        }
    }
    
    //logics and query for removing comments
    async removeComment(blogId: string,userId: string,commentId: string) {
        const session = this.db.client.startSession()
        session.startTransaction()
        try{
            const res = await this.db.collection(this.commentCollection).deleteOne(
                {
                    $and:[
                       { _id: MongoIdValidator(commentId)},{userId:userId}
                    ]
                },   
            )
            if(res.deletedCount>0){
                const res2 = await this.db.collection(this.blogCollection).updateOne(
                    {_id: MongoIdValidator(blogId)},
                    {$inc:{commentsCount:-1}}
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

    async updateComment(updateCommentDto: UpdateCommentDto){
        let res = await this.db.collection(this.commentCollection).updateOne(
            {
                $and:[
                    {_id:MongoIdValidator(updateCommentDto.commentId)},
                    {userId:updateCommentDto.userId}
                ]
            },
            {
                $set: {comment:updateCommentDto.comment}  
            }
        )
        if(res.matchedCount==0){
            throw new BadRequestException("invalid references")
        }
        return res
    }


    //for embedding style ... deprecated ...
    async commentReply(comment: CommentEntity) {
        const reply = {         
                _id: new ObjectId(),
                ...comment,
            }
        let checkUser = await this.db.collection("users").findOne(
            {_id:MongoIdValidator(comment.userId)}
        )
        if(!checkUser){
            throw new BadRequestException("invalid user")
        }
        let data = comment.cleanUndefined(reply)
        const res = await this.db.collection(this.commentCollection).updateOne(
            { _id: MongoIdValidator(comment.replyTo) },
            { $push: { replies:data} as any}
        );

        if (res.matchedCount == 0) {
            throw new NotFoundException("Parent comment not found");
        }
        return res
    }

    // Update embedded reply
    async updateReply(parentId: string, replyId: string, newText: string) {
        const res = await this.db.collection(this.commentCollection).updateOne(
            { _id: MongoIdValidator(parentId), "replies._id": MongoIdValidator(replyId) },
            { $set: { "replies.$.comment": newText } }
        );

        if (res.matchedCount == 0) {
            throw new NotFoundException("Reply not found");
        }
    }

    // Delete embedded reply
    async deleteReply(parentId: string, replyId: string) {
        const res = await this.db.collection(this.commentCollection).updateOne(
            { _id: MongoIdValidator(parentId) },
            { $pull: { replies: { _id: MongoIdValidator(replyId) }as any } }
        );

        if (res.matchedCount == 0) {
            throw new NotFoundException("Parent comment not found");
        }
    }
}