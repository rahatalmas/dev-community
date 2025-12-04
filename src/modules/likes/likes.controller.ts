import { Body, Controller, Get, Post,Delete, UseGuards } from "@nestjs/common"
import { LikeDto } from "./dto/like.dto"
import { LikesService } from "./likes.services"
import { AuthGuard } from "../auth/auth.guard"
import { ApiTags } from "@nestjs/swagger"

@ApiTags('likes')
@UseGuards(AuthGuard)
@Controller('likes')
export class LikesController{
    constructor(private readonly likesService: LikesService){}
    
    @Post('add')
    addLike(@Body() likeDto: LikeDto){
        let res = this.likesService.addLike(likeDto)
        return res
    }

    @Delete('remove')
    undoLike(@Body() likeDto: LikeDto){
        let res = this.likesService.undoLike(likeDto)
        return res
    }
}