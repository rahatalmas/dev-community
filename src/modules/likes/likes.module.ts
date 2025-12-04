import { Module } from '@nestjs/common';
import { MongoModule } from '../../common/modules/mongo.module';
import { LikeRepo } from './like.repo';
import { AuthModule } from '../auth/auth.module';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.services';

@Module({
    imports:[MongoModule],
    controllers:[LikesController],
    providers:[LikesService,LikeRepo]
})
export class LikesModule {

}
