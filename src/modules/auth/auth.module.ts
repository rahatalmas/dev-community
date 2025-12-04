import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt-constant';
import { AuthController } from './auth.controller';
import { MongoModule } from '../../common/modules/mongo.module';
import { AuthRepo } from './auth.repo';

@Module({
  imports:[
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions:{expiresIn:'1d'}
    }),
    MongoModule
  ],
  providers: [AuthService,AuthRepo],
  controllers: [AuthController]
})
export class AuthModule {}
