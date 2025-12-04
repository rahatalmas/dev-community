import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppInterceptor } from './common/interceptor/app.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { AppGuard } from './common/guard/app.guard';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { GlobalExceptionFilter } from './common/exception-filter/app.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors('*')
  app.useGlobalGuards(new AppGuard)
  app.useGlobalInterceptors(new AppInterceptor(),new ResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist:true,
      forbidNonWhitelisted:true,
      forbidUnknownValues:true,
      //******need some research.....*******
      transform:true,
      // skipMissingProperties: true,
      // transformOptions: {
      //   exposeDefaultValues: false,
      //   excludeExtraneousValues: false
      // }
      // *******************************************************
    }
  ))
  app.useGlobalFilters(new GlobalExceptionFilter())
  
  //api documentation setup:swagger(express-ui)
  const config = new DocumentBuilder()
     .setTitle("Dev Community")
     .setDescription("api documentation for dev community")
     .setVersion("1.0")
     .addTag("dev")
     .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api-docs',app,document)    
  //################################
  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
