import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BlogsModule } from './modules/articles/blog.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CommentsModule } from './modules/comments/comments.module';
import { MongoModule } from './common/modules/mongo.module';
import { LikesModule } from './modules/likes/likes.module';
import { ReplyCommentsModule } from './modules/reply-comments/reply-comments.module';

@Module({
  imports: [UsersModule, BlogsModule, CommentsModule, LikesModule,ReplyCommentsModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer){
     consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
