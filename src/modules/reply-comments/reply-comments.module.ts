import { Module } from '@nestjs/common';
import { ReplyCommentsService } from './reply-comments.service';
import { ReplyCommentsController } from './reply-comments.controller';
import { MongoModule } from '../../common/modules/mongo.module';
import { ReplyCommentsRepo } from './reply-comment.repo';

@Module({
  imports:[MongoModule],
  controllers: [ReplyCommentsController],
  providers: [ReplyCommentsService,ReplyCommentsRepo],
})
export class ReplyCommentsModule {}
