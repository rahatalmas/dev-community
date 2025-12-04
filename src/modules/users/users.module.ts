import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepo } from './users.repo';
import { MongoModule } from '../../common/modules/mongo.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[MongoModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepo],
})

export class UsersModule {}
