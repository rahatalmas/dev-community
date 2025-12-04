import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { BlogRepository } from '../articles/blog.repository';
import { MongoModule } from '../../common/modules/mongo.module';
import { CommentRepository } from './comment.resitory';

@Module({
  imports:[MongoModule],
  controllers: [CommentsController],
  providers: [CommentsService, BlogRepository, CommentRepository],
})
export class CommentsModule {}
