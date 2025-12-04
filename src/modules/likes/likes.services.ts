import { Inject, Injectable } from "@nestjs/common";
import { LikeDto } from "./dto/like.dto";
import { LikeRepo } from "./like.repo";

@Injectable()
export class LikesService{
    constructor(private readonly likeRepo: LikeRepo){}
    async addLike(likeDto: LikeDto){
        let res = await this.likeRepo.addLike(likeDto)
        console.log("Like add: ",res)
        return res
    }
    async undoLike(likeDto: LikeDto){
        let res = await this.likeRepo.undoLike(likeDto)
        return res
    }
}