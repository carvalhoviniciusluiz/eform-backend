import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheService } from 'common';
import { typeOrmConfig } from './ormconfig';
import { mailerConfig } from './mailerconfig';
import { RootModule } from './root/root.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import * as ENV from './constants';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: CacheService
    }),
    MailerModule.forRoot(mailerConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot(ENV.MONGODB_URL),
    RootModule,
    UsersModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
  exports: [TypeOrmModule]
})
export class AppModule {}
