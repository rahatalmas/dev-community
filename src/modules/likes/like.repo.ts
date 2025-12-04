import { BadRequestException, ConflictException, Inject, Injectable } from "@nestjs/common";
import { Db } from "mongodb";
import { LikeDto } from "./dto/like.dto";
import { MongoIdValidator } from "../../common/utils/mongo.util";

@Injectable()
export class LikeRepo{
    collection = "likes"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}

    //this method is for like a content
    async addLike(likeDto: LikeDto){
        //1. validatino of existance
        //check user exists or not 
        //check content exits or not
        let relationalTable:string
        let exists = await this.db.collection(this.collection).findOne({...likeDto})
        if(exists){
            throw new ConflictException("already liked")
        }
        let user = await this.db.collection("users").findOne({_id:MongoIdValidator(likeDto.userId)})
        if(!user){
            throw new BadRequestException("invalid references")
        }
        if(likeDto.contentType === "blog"){
            relationalTable = "blogs"
            let blog = await this.db.collection(relationalTable).findOne({_id:MongoIdValidator(likeDto.contentId)})
            if(!blog){
                throw new BadRequestException("invalid references")    
            }
        }else if(likeDto.contentType === "comment"){
            relationalTable = "comments"
            let comment = await this.db.collection(relationalTable).findOne({_id:MongoIdValidator(likeDto.contentId)})
            if(!comment){
                throw new BadRequestException("invalid references")    
            }
        }else if(likeDto.contentType === "commentsReply"){
            relationalTable = "commentsReply"
            let comment = await this.db.collection(relationalTable).findOne({_id:MongoIdValidator(likeDto.contentId)})
            if(!comment){
                throw new BadRequestException("invalid references")    
            }
        }
        else{
            throw new BadRequestException("Invalid content type")
        }

        const session = this.db.client.startSession()
        session.startTransaction()
        try{
            let res = await this.db.collection(this.collection).insertOne(likeDto)
            let res2 = await this.db.collection(relationalTable).updateOne(
                {_id:MongoIdValidator(likeDto.contentId)}
                ,
                {$inc:{likesCount:1}
            })
            return res
        }catch(err){
            await session.abortTransaction()
            console.log(err)
            throw err
        }finally{
            await session.endSession()            
        }

    }


    //this function is for undo a like
    async undoLike(likeDto: LikeDto){
        let relationalTable:string
        let user = await this.db.collection("users").findOne({_id:MongoIdValidator(likeDto.userId)})
        if(!user){
            throw new BadRequestException("invalid references")
        }
        console.log("user")
        if(likeDto.contentType === "blog"){
            relationalTable = "blogs"
            let blog = await this.db.collection(relationalTable).findOne({_id:MongoIdValidator(likeDto.contentId)})
            if(!blog){
                throw new BadRequestException("invalid blog reference")    
            }
        }else if(likeDto.contentType === "comment"){
            relationalTable = "comments"
            let comment = await this.db.collection(relationalTable).findOne({_id:MongoIdValidator(likeDto.contentId)})
            if(!comment){
                throw new BadRequestException("invalid comment reference")    
            }
        }else if(likeDto.contentType === "commentsReply"){
            relationalTable = "commentsReply"
            let comment = await this.db.collection(relationalTable).findOne({_id:MongoIdValidator(likeDto.contentId)})
            if(!comment){
                throw new BadRequestException("invalid comment reference")    
            }
        }
        else{
            throw new BadRequestException("Invalid content type")
        }
        const session = this.db.client.startSession()
        session.startTransaction()
        try{
            //saving the like
            let res =  await this.db.collection(this.collection).deleteOne({
                $and:[{contentType:likeDto.contentType},{userId:likeDto.userId},{contentId:likeDto.contentId}]
            })
            if (res.deletedCount <= 0){
                throw new BadRequestException("nothing to delete with those references")
            }
            let res2 = this.db.collection(relationalTable).updateOne(
                {_id:MongoIdValidator(likeDto.contentId)}
                ,
                {$dec:{likeCount:-1}
            })
            return res
        }catch(err){
            await session.abortTransaction()
            console.log(err)
            throw err
        }finally{
            await session.endSession()            
        }

    }

    // getLikesByContentId(likeDto: LikeDto){
        
    // }

    // async undoLike(likeDto: LikeDto){
    //     let res = this.db.collection(this.collection).deleteOne({
    //         $and:[{contentType:likeDto.contentType},{userId:likeDto.userId},{contentId:likeDto.contentId}]
    //     })
    //     return res
    // }
}