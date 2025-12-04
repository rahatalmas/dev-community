import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateCommentDto } from "./create-comment.dto";
import { IsNotEmpty,IsString } from "class-validator";

export class ReplyCommentDto extends PickType(CreateCommentDto,["userId","comment"]) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    replyTo:string
}