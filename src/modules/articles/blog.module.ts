import { Module } from '@nestjs/common';
import { BlogsService } from './blog.service';
import { BlogsController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { MongoModule } from '../../common/modules/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [BlogsController],
  providers: [BlogsService, BlogRepository],
  exports:[BlogRepository]
})
export class BlogsModule {}
