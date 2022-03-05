import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filter/http-exception-filter.filter';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductionOrderModule } from './productionorder/productionorder.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductionOrderModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
